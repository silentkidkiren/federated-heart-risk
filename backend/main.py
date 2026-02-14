from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import training_router, prediction_router, system_router, hospital_router

app = FastAPI(title="Federated Cardiovascular Disease Risk Prediction")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(training_router.router)
app.include_router(prediction_router.router)
app.include_router(system_router.router)
app.include_router(hospital_router.router)