from fastapi import APIRouter
from controllers.system_controller import system_controller

router = APIRouter()

@router.post("/reset")
async def reset_system():
    return system_controller.reset_system()