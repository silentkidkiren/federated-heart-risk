from services.training_service import training_service

class TrainingController:
    def __init__(self):
        self.service = training_service
    
    def start_training(self, config: dict):
        return self.service.start_training(config)
    
    def get_training_status(self):
        return self.service.get_training_status()
    
    def get_metrics(self):
        return self.service.get_metrics()

training_controller = TrainingController()