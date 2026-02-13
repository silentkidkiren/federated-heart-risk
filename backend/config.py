"""Configuration settings for the federated learning demo."""

# Federated Learning Settings
NUM_CLIENTS = 3
NUM_ROUNDS = 5
LOCAL_EPOCHS = 2
BATCH_SIZE = 32
LEARNING_RATE = 0.001

# Client Names (Hospitals)
CLIENT_NAMES = [
    "St. Mary's Hospital",
    "Central Medical Center",
    "University Health System"
]

# Dataset Settings
SAMPLES_PER_CLIENT = 200
NUM_FEATURES = 13
TEST_SIZE = 0.2

# Model Settings
HIDDEN_LAYERS = [64, 32, 16]
DROPOUT_RATE = 0.3

# SHAP Settings
SHAP_BACKGROUND_SAMPLES = 100

# Feature Names for Heart Disease Dataset
FEATURE_NAMES = [
    "age",
    "sex",
    "chest_pain_type",
    "resting_bp",
    "cholesterol",
    "fasting_bs",
    "resting_ecg",
    "max_heart_rate",
    "exercise_angina",
    "oldpeak",
    "st_slope",
    "ca",
    "thal"
]

# Feature Descriptions for UI
FEATURE_DESCRIPTIONS = {
    "age": "Age in years",
    "sex": "Sex (1=male, 0=female)",
    "chest_pain_type": "Chest pain type (0-3)",
    "resting_bp": "Resting blood pressure (mm Hg)",
    "cholesterol": "Serum cholesterol (mg/dl)",
    "fasting_bs": "Fasting blood sugar > 120 mg/dl (1=yes, 0=no)",
    "resting_ecg": "Resting ECG results (0-2)",
    "max_heart_rate": "Maximum heart rate achieved",
    "exercise_angina": "Exercise induced angina (1=yes, 0=no)",
    "oldpeak": "ST depression induced by exercise",
    "st_slope": "Slope of peak exercise ST segment (0-2)",
    "ca": "Number of major vessels (0-3)",
    "thal": "Thalassemia (0-2)"
}

