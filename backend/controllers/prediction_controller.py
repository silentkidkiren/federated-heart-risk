from services.prediction_service import prediction_service

class PredictionController:
    def __init__(self):
        self.service = prediction_service
    
    def predict(self, features: dict):
        return self.service.predict(features)
    
    def get_features(self):
        return self.service.get_features()

prediction_controller = PredictionController()