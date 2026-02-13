"""Flower client for federated learning."""

import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from typing import Dict, List, Tuple
import flwr as fl
import numpy as np

from models.heart_model import get_parameters, set_parameters
from config import BATCH_SIZE, LOCAL_EPOCHS, LEARNING_RATE


class HeartDiseaseClient(fl.client.NumPyClient):
    """Flower client for federated heart disease prediction."""
    
    def __init__(self, model, X_train, y_train, X_test, y_test):
        """
        Initialize client with model and data.
        
        Args:
            model: PyTorch model
            X_train, y_train: Training data
            X_test, y_test: Test data
        """
        self.model = model
        self.X_train = torch.FloatTensor(X_train)
        self.y_train = torch.FloatTensor(y_train).reshape(-1, 1)
        self.X_test = torch.FloatTensor(X_test)
        self.y_test = torch.FloatTensor(y_test).reshape(-1, 1)
        
        # Create data loaders
        train_dataset = TensorDataset(self.X_train, self.y_train)
        self.train_loader = DataLoader(
            train_dataset, 
            batch_size=BATCH_SIZE, 
            shuffle=True
        )
        
        test_dataset = TensorDataset(self.X_test, self.y_test)
        self.test_loader = DataLoader(
            test_dataset, 
            batch_size=BATCH_SIZE
        )
        
        self.criterion = nn.BCELoss()
        self.optimizer = torch.optim.Adam(
            self.model.parameters(), 
            lr=LEARNING_RATE
        )
    
    def get_parameters(self, config: Dict) -> List[np.ndarray]:
        """Return current model parameters."""
        return get_parameters(self.model)
    
    def fit(self, parameters: List[np.ndarray], config: Dict) -> Tuple[List[np.ndarray], int, Dict]:
        """Train the model on local data."""
        # Set model parameters
        set_parameters(self.model, parameters)
        
        # Train
        self.model.train()
        epoch_losses = []
        
        for epoch in range(LOCAL_EPOCHS):
            batch_losses = []
            for X_batch, y_batch in self.train_loader:
                self.optimizer.zero_grad()
                outputs = self.model(X_batch)
                loss = self.criterion(outputs, y_batch)
                loss.backward()
                self.optimizer.step()
                batch_losses.append(loss.item())
            
            epoch_loss = np.mean(batch_losses)
            epoch_losses.append(epoch_loss)
        
        # Return updated parameters and metrics
        return (
            get_parameters(self.model),
            len(self.X_train),
            {"train_loss": float(np.mean(epoch_losses))}
        )
    
    def evaluate(self, parameters: List[np.ndarray], config: Dict) -> Tuple[float, int, Dict]:
        """Evaluate the model on local test data."""
        # Set model parameters
        set_parameters(self.model, parameters)
        
        # Evaluate
        self.model.eval()
        total_loss = 0.0
        correct = 0
        total = 0
        
        with torch.no_grad():
            for X_batch, y_batch in self.test_loader:
                outputs = self.model(X_batch)
                loss = self.criterion(outputs, y_batch)
                total_loss += loss.item() * len(X_batch)
                
                # Calculate accuracy
                predictions = (outputs >= 0.5).float()
                correct += (predictions == y_batch).sum().item()
                total += len(y_batch)
        
        avg_loss = total_loss / total
        accuracy = correct / total
        
        return (
            avg_loss,
            len(self.X_test),
            {"accuracy": accuracy}
        )


def create_client(model, X_train, y_train, X_test, y_test):
    """Factory function to create a client."""
    return HeartDiseaseClient(model, X_train, y_train, X_test, y_test)