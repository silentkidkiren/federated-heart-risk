"""Federated learning package."""

from .client import HeartDiseaseClient, create_client
from .server import get_federated_strategy
from .simulation import run_federated_simulation, extract_training_history

__all__ = [
    'HeartDiseaseClient',
    'create_client',
    'get_federated_strategy',
    'run_federated_simulation',
    'extract_training_history'
]