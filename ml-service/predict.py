import numpy as np
import joblib
from tensorflow.keras.models import load_model
from feature_extractor import extract_features, load_plt

# ✅ LOCAL paths (NO Colab paths)
MODEL_PATH = "model/cnn_lstm_model.h5"
SCALER_PATH = "scaler/scaler.pkl"

model = load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# anomaly confidence threshold
ANOMALY_SCORE_THRESHOLD = 0.05

def predict_from_plt(file_path):

    df = load_plt(file_path)

    if df is None or len(df) < 10:
        return 0.0, 0, 0.0

    features = extract_features(df)

    if features is None:
        return 0.0, 0, 0.0

    X_raw = np.array([[ 
        features["avg_speed"],
        features["max_speed"],
        features["total_distance"],
        features["stop_ratio"]
    ]])

    # same scaling as training
    X_scaled = scaler.transform(X_raw)

    # CNN-LSTM input shape → (None, 4, 1)
    X = X_scaled.reshape(1, 4, 1)

    prob = model.predict(X, verbose=0)[0][0]

    # ✅ anomaly confidence
    anomaly_score = abs(prob - 0.5) * 2

    # final flag
    label = int(anomaly_score >= ANOMALY_SCORE_THRESHOLD)

    return float(prob), label, float(anomaly_score)
