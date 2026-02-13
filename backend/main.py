"""FastAPI application for federated cardiovascular risk prediction."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn

from training.manager import training_manager
from explainability.shap_explainer import explainer
from utils.metrics import format_metrics_for_display
from config import FEATURE_NAMES, FEATURE_DESCRIPTIONS, CLIENT_NAMES

# Create FastAPI app
app = FastAPI(
    title="Federated CVD Risk Prediction API",
    description="API for federated learning cardiovascular disease risk prediction",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models for request/response
class PredictionRequest(BaseModel):
    """Request model for prediction endpoint."""
    features: List[float]
    
    class Config:
        json_schema_extra = {
            "example": {
                "features": [55, 1, 2, 140, 250, 0, 1, 150, 1, 2.5, 1, 1, 2]
            }
        }


class PredictionResponse(BaseModel):
    """Response model for prediction endpoint."""
    prediction: float
    risk_level: str
    confidence: float
    feature_importance: List[dict]


class TrainingStatusResponse(BaseModel):
    """Response model for training status."""
    status: str
    current_round: int
    total_rounds: int
    progress: float
    start_time: str = None
    end_time: str = None
    error_message: str = None


class MetricsResponse(BaseModel):
    """Response model for metrics."""
    total_rounds: int
    average_accuracy: float
    latest_accuracy: float
    improvement: float
    rounds: List[dict]


# API Endpoints

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "Federated CVD Risk Prediction API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "start_training": "POST /start-training",
            "training_status": "GET /training-status",
            "metrics": "GET /metrics",
            "predict": "POST /predict",
            "clients": "GET /clients",
            "features": "GET /features"
        }
    }


@app.post("/start-training")
async def start_training():
    """Start federated learning training."""
    try:
        training_manager.start_training()
        return {
            "message": "Training started successfully",
            "status": "training"
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start training: {str(e)}")


@app.get("/training-status", response_model=TrainingStatusResponse)
async def get_training_status():
    """Get current training status."""
    status = training_manager.get_status()
    return status


@app.get("/metrics")
async def get_metrics():
    """Get training metrics and history."""
    metrics = training_manager.get_metrics()
    
    if metrics["history"]:
        formatted = format_metrics_for_display(metrics["history"])
        return formatted
    else:
        return {
            "total_rounds": 0,
            "average_accuracy": 0.0,
            "latest_accuracy": 0.0,
            "improvement": 0.0,
            "rounds": []
        }


@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """
    Make a prediction for cardiovascular disease risk.
    
    Args:
        request: Patient features
    
    Returns:
        Prediction with SHAP explanation
    """
    try:
        # Validate input
        if len(request.features) != len(FEATURE_NAMES):
            raise HTTPException(
                status_code=400,
                detail=f"Expected {len(FEATURE_NAMES)} features, got {len(request.features)}"
            )
        
        # Get prediction with explanation
        result = explainer.explain_prediction(request.features)
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/clients")
async def get_clients():
    """Get information about federated learning clients (hospitals)."""
    return {
        "clients": [
            {
                "id": i,
                "name": CLIENT_NAMES[i],
                "status": "active",
                "samples": 200
            }
            for i in range(len(CLIENT_NAMES))
        ]
    }


@app.get("/features")
async def get_features():
    """Get information about model features."""
    return {
        "features": [
            {
                "name": name,
                "description": FEATURE_DESCRIPTIONS.get(name, ""),
                "index": i
            }
            for i, name in enumerate(FEATURE_NAMES)
        ]
    }


@app.post("/reset")
async def reset_training():
    """Reset training state (for development)."""
    try:
        training_manager.reset()
        return {"message": "Training state reset successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reset failed: {str(e)}")


# Run the application
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
