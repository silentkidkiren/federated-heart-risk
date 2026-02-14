from training.manager import training_manager

class SystemService:
    def __init__(self):
        self.manager = training_manager
    
    def reset_system(self):
        return self.manager.reset()

system_service = SystemService()