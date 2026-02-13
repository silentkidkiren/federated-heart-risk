"""Flower server strategy for federated learning."""

from typing import Dict, List, Optional, Tuple
import flwr as fl
from flwr.common import Metrics
import numpy as np


def weighted_average(metrics: List[Tuple[int, Metrics]]) -> Metrics:
    """Aggregate metrics using weighted average."""
    # Multiply accuracy of each client by number of examples used
    accuracies = [num_examples * m["accuracy"] for num_examples, m in metrics]
    examples = [num_examples for num_examples, _ in metrics]
    
    # Aggregate and return custom metric (weighted average)
    return {"accuracy": sum(accuracies) / sum(examples)}


def get_federated_strategy():
    """Create and configure the federated averaging strategy."""
    strategy = fl.server.strategy.FedAvg(
        fraction_fit=1.0,  # Use all available clients for training
        fraction_evaluate=1.0,  # Use all available clients for evaluation
        min_fit_clients=3,  # Minimum number of clients for training
        min_evaluate_clients=3,  # Minimum number of clients for evaluation
        min_available_clients=3,  # Wait until all 3 clients are available
        evaluate_metrics_aggregation_fn=weighted_average,  # Aggregate metrics
    )
    return strategy
