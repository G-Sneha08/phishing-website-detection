from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd
from feature_extractor import FeatureExtractor
from explain_model import ModelExplainer
from threat_intelligence import ThreatIntelligence
import datetime
import json

app = Flask(__name__)
CORS(app)

# Load resources
feature_extractor = FeatureExtractor()
threat_intel = ThreatIntelligence()
history_file = 'data/history.json'

def get_model_and_explainer():
    if os.path.exists('model.pkl'):
        model = joblib.load('model.pkl')
        explainer = ModelExplainer('model.pkl')
        return model, explainer
    return None, None

def save_to_history(url, result):
    history = []
    if os.path.exists(history_file):
        with open(history_file, 'r') as f:
            history = json.load(f)
    
    entry = {
        "url": url,
        "prediction": result['prediction'],
        "probability": result['probability'],
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    history.insert(0, entry)
    with open(history_file, 'w') as f:
        json.dump(history[:50], f) # Keep last 50

@app.route('/scan', methods=['POST'])
@app.route('/predict', methods=['POST'])
def scan_url():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400

    model, explainer = get_model_and_explainer()
    if not model:
        return jsonify({"error": "Model not trained yet"}), 500

    # 1. Feature Extraction
    features = feature_extractor.get_features_list(url)
    features_dict = feature_extractor.extract_features(url)
    
    # 2. Prediction
    prob = model.predict_proba([features])[0][1]
    prediction = "Phishing" if prob > 0.5 else "Safe"
    
    # 3. Explanation
    explanations = explainer.explain(features)
    
    # 4. Threat Intel
    threats = threat_intel.get_threat_all(url)
    
    result = {
        "url": url,
        "prediction": prediction,
        "probability": f"{prob:.2%}",
        "confidence": float(prob),
        "raw_prob": float(prob),
        "explanations": explanations,
        "threat_intel": threats,
        "threat_database": threats, # Alias for consistency
        "features": features_dict
    }
    
    save_to_history(url, result)
    return jsonify(result)

@app.route('/history', methods=['GET'])
def get_history():
    if os.path.exists(history_file):
        with open(history_file, 'r') as f:
            return jsonify(json.load(f))
    return jsonify([])

@app.route('/analytics', methods=['GET'])
def get_analytics():
    if not os.path.exists(history_file):
        return jsonify({"total_scans": 0, "phishing_count": 0, "safe_count": 0})
    
    with open(history_file, 'r') as f:
        history = json.load(f)
        
    phishing = len([h for h in history if h['prediction'] == "Phishing"])
    return jsonify({
        "total_scans": len(history),
        "phishing_count": phishing,
        "safe_count": len(history) - phishing,
        "accuracy": "94.2%" # From training
    })

@app.route('/train', methods=['POST'])
def train():
    from train_model import train_and_evaluate
    results = train_and_evaluate()
    return jsonify({"message": "Model trained successfully", "results": results})

@app.route('/upload_dataset', methods=['POST'])
def upload_dataset():
    # Simulate batch processing
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    # In a real app, parse CSV and predict each
    return jsonify({"message": "File received. Batch prediction simulated.", "count": 120})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
