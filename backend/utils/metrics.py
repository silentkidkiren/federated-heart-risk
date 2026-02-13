"""Utility functions for metrics tracking."""

from typing import List, Dict


def calculate_average_accuracy(history: List[Dict]) -> float:
    """
    Calculate average accuracy across all rounds.
    
    Args:
        history: List of round metrics
    
    Returns:
        Average accuracy
    """
    if not history:
        return 0.0
    
    accuracies = [round_data.get("accuracy", 0) for round_data in history]
    return sum(accuracies) / len(accuracies)


def get_latest_accuracy(history: List[Dict]) -> float:
    """
    Get accuracy from the most recent round.
    
    Args:
        history: List of round metrics
    
    Returns:
        Latest accuracy
    """
    if not history:
        return 0.0
    
    return history[-1].get("accuracy", 0.0)


def format_metrics_for_display(history: List[Dict]) -> Dict:
    """
    Format metrics for frontend display.
    
    Args:
        history: List of round metrics
    
    Returns:
        Formatted metrics dictionary
    """
    return {
        "total_rounds": len(history),
        "average_accuracy": calculate_average_accuracy(history),
        "latest_accuracy": get_latest_accuracy(history),
        "improvement": get_latest_accuracy(history) - history[0].get("accuracy", 0) if history else 0,
        "rounds": history
    }
