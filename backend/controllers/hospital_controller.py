from services.hospital_service import hospital_service

class HospitalController:
    def __init__(self):
        self.service = hospital_service
    
    def get_clients(self):
        return self.service.get_clients()

hospital_controller = HospitalController()