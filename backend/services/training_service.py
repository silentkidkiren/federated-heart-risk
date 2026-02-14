from training.manager import training_manager

class TrainingService:
    def __init__(self):
        self.manager = training_manager
    
    def start_training(self, config: dict):
        return self.manager.start_training(config)
    
    def get_training_status(self):
        return self.manager.get_status()
    
    def get_metrics(self):
        return self.manager.get_metrics()

training_service = TrainingService()