"""Background training manager for non-blocking federated learning."""

import asyncio
import threading
from typing import Optional, Dict
from datetime import datetime

from federated.simulation import run_federated_simulation, extract_training_history


class TrainingManager:
    """Manages background training execution and status tracking."""
    
    def __init__(self):
        """Initialize the training manager."""
        self.status = "idle"  # idle, training, completed, error
        self.current_round = 0
        self.total_rounds = 0
        self.training_history = []
        self.error_message = None
        self.start_time = None
        self.end_time = None
        self.training_thread = None
        self.global_model = None  # Will store the trained model
    
    def get_status(self) -> Dict:
        """Get current training status."""
        return {
            "status": self.status,
            "current_round": self.current_round,
            "total_rounds": self.total_rounds,
            "progress": self.current_round / self.total_rounds if self.total_rounds > 0 else 0,
            "start_time": self.start_time.isoformat() if self.start_time else None,
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "error_message": self.error_message
        }
    
    def get_metrics(self) -> Dict:
        """Get training metrics and history."""
        return {
            "history": self.training_history,
            "status": self.status,
            "total_rounds": self.total_rounds
        }
    
    def start_training(self):
        """Start training in a background thread."""
        if self.status == "training":
            raise ValueError("Training is already in progress")
        
        # Reset state
        self.status = "training"
        self.current_round = 0
        self.training_history = []
        self.error_message = None
        self.start_time = datetime.now()
        self.end_time = None
        
        # Start training in background thread
        self.training_thread = threading.Thread(target=self._run_training)
        self.training_thread.start()
    
    def _run_training(self):
        """Internal method to run training (executed in background thread)."""
        try:
            # Run federated simulation
            simulation_results = run_federated_simulation()
            
            # Extract history
            self.training_history = extract_training_history(simulation_results)
            self.total_rounds = simulation_results["rounds"]
            self.current_round = self.total_rounds
            
            # Update status
            self.status = "completed"
            self.end_time = datetime.now()
            
        except Exception as e:
            self.status = "error"
            self.error_message = str(e)
            self.end_time = datetime.now()
    
    def reset(self):
        """Reset the training manager to initial state."""
        if self.status == "training":
            raise ValueError("Cannot reset while training is in progress")
        
        self.status = "idle"
        self.current_round = 0
        self.total_rounds = 0
        self.training_history = []
        self.error_message = None
        self.start_time = None
        self.end_time = None
        self.global_model = None


# Global training manager instance
training_manager = TrainingManager()
