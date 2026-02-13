"""Dummy heart disease dataset generator."""

import numpy as np
from sklearn.model_selection import train_test_split
from config import NUM_FEATURES, SAMPLES_PER_CLIENT, TEST_SIZE


def generate_heart_disease_data(num_samples=200, client_id=0, seed=None):
    """
    Generate synthetic heart disease dataset.
    
    Args:
        num_samples: Number of samples to generate
        client_id: Client identifier for reproducibility
        seed: Random seed (if None, uses client_id)
    
    Returns:
        X_train, X_test, y_train, y_test: Train/test splits
    """
    if seed is None:
        seed = 42 + client_id
    
    np.random.seed(seed)
    
    # Generate features
    X = np.zeros((num_samples, NUM_FEATURES))
    
    # Age: 30-80
    X[:, 0] = np.random.randint(30, 80, num_samples)
    
    # Sex: 0 or 1
    X[:, 1] = np.random.randint(0, 2, num_samples)
    
    # Chest pain type: 0-3
    X[:, 2] = np.random.randint(0, 4, num_samples)
    
    # Resting BP: 90-200
    X[:, 3] = np.random.randint(90, 200, num_samples)
    
    # Cholesterol: 120-400
    X[:, 4] = np.random.randint(120, 400, num_samples)
    
    # Fasting blood sugar: 0 or 1
    X[:, 5] = np.random.randint(0, 2, num_samples)
    
    # Resting ECG: 0-2
    X[:, 6] = np.random.randint(0, 3, num_samples)
    
    # Max heart rate: 70-200
    X[:, 7] = np.random.randint(70, 200, num_samples)
    
    # Exercise angina: 0 or 1
    X[:, 8] = np.random.randint(0, 2, num_samples)
    
    # Oldpeak: 0-6 (with decimals)
    X[:, 9] = np.random.uniform(0, 6, num_samples)
    
    # ST slope: 0-2
    X[:, 10] = np.random.randint(0, 3, num_samples)
    
    # CA: 0-3
    X[:, 11] = np.random.randint(0, 4, num_samples)
    
    # Thal: 0-2
    X[:, 12] = np.random.randint(0, 3, num_samples)
    
    # Generate labels based on risk factors (synthetic logic)
    risk_score = (
        (X[:, 0] > 55).astype(int) * 0.3 +  # Age > 55
        (X[:, 1] == 1).astype(int) * 0.2 +   # Male
        (X[:, 2] >= 2).astype(int) * 0.3 +   # Chest pain
        (X[:, 3] > 140).astype(int) * 0.2 +  # High BP
        (X[:, 4] > 240).astype(int) * 0.3 +  # High cholesterol
        (X[:, 7] < 120).astype(int) * 0.2 +  # Low max HR
        (X[:, 8] == 1).astype(int) * 0.3     # Exercise angina
    )
    
    # Add some randomness and client-specific bias
    client_bias = (client_id * 0.05) - 0.05  # -0.05, 0, 0.05 for 3 clients
    risk_score += client_bias + np.random.normal(0, 0.1, num_samples)
    
    # Convert to binary labels
    y = (risk_score > 0.5).astype(int)
    
    # Normalize features
    X = (X - X.mean(axis=0)) / (X.std(axis=0) + 1e-7)
    
    # Split into train/test
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=seed
    )
    
    return X_train, X_test, y_train, y_test


def generate_new_batch(client_id=0, batch_size=50):
    """
    Generate a new batch of data for continual learning.
    
    Args:
        client_id: Client identifier
        batch_size: Number of samples in the new batch
    
    Returns:
        X_new, y_new: New data batch
    """
    # Use a different seed for new batches
    seed = 1000 + client_id
    X_train, _, y_train, _ = generate_heart_disease_data(
        num_samples=batch_size, 
        client_id=client_id, 
        seed=seed
    )
    return X_train, y_train

