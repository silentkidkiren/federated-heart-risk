from training.manager import training_manager

class HospitalService:
    def __init__(self):
        self.manager = training_manager
    
    def get_clients(self):
        return self.manager.get_clients()

hospital_service = HospitalService()