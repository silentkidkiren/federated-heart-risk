from services.system_service import system_service

class SystemController:
    def __init__(self):
        self.service = system_service
    
    def reset_system(self):
        return self.service.reset_system()

system_controller = SystemController()