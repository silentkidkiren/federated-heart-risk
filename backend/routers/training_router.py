from fastapi import APIRouter
from controllers.training_controller import training_controller

router = APIRouter()

@router.post("/start-training")
async def start_training(config: dict):
    return training_controller.start_training(config)

@router.get("/training-status")
async def get_training_status():
    return training_controller.get_training_status()

@router.get("/metrics")
async def get_metrics():
    return training_controller.get_metrics()