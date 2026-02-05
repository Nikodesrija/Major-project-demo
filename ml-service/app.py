from flask import Flask, request, jsonify
from predict import predict_from_plt
import os

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()
    file_path = data.get("file_path")

    if not file_path or not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 400

    # ✅ FIXED unpacking
    prob, label, score = predict_from_plt(file_path)

    return jsonify({
        "anomaly_probability": prob,
        "anomaly_score": score,
        "anomaly": label
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)
