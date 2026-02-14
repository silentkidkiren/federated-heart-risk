from fastapi import APIRouter
from controllers.hospital_controller import hospital_controller

router = APIRouter()

@router.get("/clients")
async def get_clients():
    return hospital_controller.get_clients()