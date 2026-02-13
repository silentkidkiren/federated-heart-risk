"""Neural network model for cardiovascular risk prediction."""

import torch
import torch.nn as nn
import torch.nn.functional as F
from config import NUM_FEATURES, HIDDEN_LAYERS, DROPOUT_RATE


class HeartDiseaseModel(nn.Module):
    """Simple feedforward neural network for binary classification."""
    
    def __init__(self):
        super(HeartDiseaseModel, self).__init__()
        
        # Input layer
        self.fc1 = nn.Linear(NUM_FEATURES, HIDDEN_LAYERS[0])
        self.dropout1 = nn.Dropout(DROPOUT_RATE)
        
        # Hidden layers
        self.fc2 = nn.Linear(HIDDEN_LAYERS[0], HIDDEN_LAYERS[1])
        self.dropout2 = nn.Dropout(DROPOUT_RATE)
        
        self.fc3 = nn.Linear(HIDDEN_LAYERS[1], HIDDEN_LAYERS[2])
        self.dropout3 = nn.Dropout(DROPOUT_RATE)
        
        # Output layer
        self.fc4 = nn.Linear(HIDDEN_LAYERS[2], 1)
    
    def forward(self, x):
        """Forward pass through the network."""
        x = F.relu(self.fc1(x))
        x = self.dropout1(x)
        
        x = F.relu(self.fc2(x))
        x = self.dropout2(x)
        
        x = F.relu(self.fc3(x))
        x = self.dropout3(x)
        
        x = torch.sigmoid(self.fc4(x))
        return x


def get_parameters(model):
    """Extract model parameters as a list of numpy arrays."""
    return [val.cpu().numpy() for _, val in model.state_dict().items()]


def set_parameters(model, parameters):
    """Set model parameters from a list of numpy arrays."""
    params_dict = zip(model.state_dict().keys(), parameters)
    state_dict = {k: torch.tensor(v) for k, v in params_dict}
    model.load_state_dict(state_dict, strict=True)

