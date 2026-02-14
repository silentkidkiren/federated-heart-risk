from explainability.shap_explainer import explainer
from training.manager import training_manager

class PredictionService:
    def __init__(self):
        self.explainer = explainer
        self.manager = training_manager
    
    def predict(self, features: dict):
        return self.explainer.explain_prediction(features)
    
    def get_features(self):
        return self.manager.get_feature_names()

prediction_service = PredictionService()