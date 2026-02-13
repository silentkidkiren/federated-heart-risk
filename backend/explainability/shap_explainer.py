"""SHAP explainability for model predictions."""

import torch
import numpy as np
import shap
from typing import Dict, List

from models.heart_model import HeartDiseaseModel
from data.dataset import generate_heart_disease_data
from config import FEATURE_NAMES, SHAP_BACKGROUND_SAMPLES


class ShapExplainer:
    """SHAP-based model explainer."""
    
    def __init__(self):
        """Initialize the explainer."""
        self.model = None
        self.explainer = None
        self.background_data = None
    
    def setup(self, model: HeartDiseaseModel):
        """
        Set up the explainer with a trained model.
        
        Args:
            model: Trained PyTorch model
        """
        self.model = model
        self.model.eval()
        
        # Generate background data for SHAP
        X_train, _, _, _ = generate_heart_disease_data(
            num_samples=SHAP_BACKGROUND_SAMPLES,
            client_id=0
        )
        self.background_data = torch.FloatTensor(X_train)
        
        # Create SHAP explainer
        # Using DeepExplainer for neural networks
        self.explainer = shap.DeepExplainer(self.model, self.background_data)
    
    def explain_prediction(self, features: List[float]) -> Dict:
        """
        Explain a single prediction using SHAP values.
        
        Args:
            features: List of feature values
        
        Returns:
            Dictionary containing prediction and SHAP values
        """
        if self.model is None or self.explainer is None:
            # If model not trained, return dummy explanation
            return self._get_dummy_explanation(features)
        
        # Convert to tensor
        input_tensor = torch.FloatTensor([features])
        
        # Get prediction
        with torch.no_grad():
            prediction = self.model(input_tensor).item()
        
        # Get SHAP values
        shap_values = self.explainer.shap_values(input_tensor)
        
        # Convert to list (handle different SHAP output formats)
        if isinstance(shap_values, list):
            shap_values = shap_values[0]
        
        shap_values = shap_values[0].tolist() if len(shap_values.shape) > 1 else shap_values.tolist()
        
        # Create feature importance list
        feature_importance = [
            {
                "feature": FEATURE_NAMES[i],
                "value": float(features[i]),
                "shap_value": float(shap_values[i])
            }
            for i in range(len(features))
        ]
        
        # Sort by absolute SHAP value
        feature_importance.sort(key=lambda x: abs(x["shap_value"]), reverse=True)
        
        return {
            "prediction": float(prediction),
            "risk_level": "High" if prediction > 0.5 else "Low",
            "confidence": float(abs(prediction - 0.5) * 2),  # 0 to 1
            "feature_importance": feature_importance
        }
    
    def _get_dummy_explanation(self, features: List[float]) -> Dict:
        """
        Generate dummy explanation when model is not trained.
        
        Args:
            features: List of feature values
        
        Returns:
            Dummy explanation dictionary
        """
        # Simple rule-based prediction for demo
        risk_score = (
            (features[0] > 0.5) * 0.3 +  # Age
            (features[1] > 0) * 0.2 +     # Sex
            (features[3] > 0.5) * 0.2 +   # BP
            (features[4] > 0.5) * 0.3     # Cholesterol
        )
        
        prediction = min(0.9, max(0.1, risk_score))
        
        # Create dummy SHAP values
        feature_importance = [
            {
                "feature": FEATURE_NAMES[i],
                "value": float(features[i]),
                "shap_value": float(np.random.randn() * 0.1)
            }
            for i in range(len(features))
        ]
        
        feature_importance.sort(key=lambda x: abs(x["shap_value"]), reverse=True)
        
        return {
            "prediction": float(prediction),
            "risk_level": "High" if prediction > 0.5 else "Low",
            "confidence": float(abs(prediction - 0.5) * 2),
            "feature_importance": feature_importance,
            "note": "Using untrained model - train first for accurate predictions"
        }


# Global explainer instance
explainer = ShapExplainer()
