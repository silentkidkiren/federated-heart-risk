from fastapi import APIRouter
from controllers.prediction_controller import prediction_controller

router = APIRouter()

@router.post("/predict")
async def predict(features: dict):
    return prediction_controller.predict(features)

@router.get("/features")
async def get_features():
    return prediction_controller.get_features()