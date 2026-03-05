import shap
import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import io
import base64

class ModelExplainer:
    def __init__(self, model_path='model.pkl'):
        self.model = joblib.load(model_path)
        self.feature_names = [
            'URL Length', 'Dots', 'Has IP', 'Has HTTPS', 'Subdomains',
            'Suspicious Words', 'Has Hyphen', 'Path Length', 
            'Special Chars', 'Digit Count', 'Redirection'
        ]

    def explain(self, features_list):
        # SHAP explanation for a single prediction
        X = pd.DataFrame([features_list], columns=self.feature_names)
        
        # Use the unified Explainer API
        explainer = shap.Explainer(self.model, X)
        shap_values = explainer(X)
        
        # Extract values for the phishing class (index 1) if available, otherwise index 0
        if len(shap_values.values.shape) == 3: # Multi-class or binary with 2 outputs
            sv = shap_values.values[0, :, 1]
        else:
            sv = shap_values.values[0]

        # Combine feature names with their SHAP values
        explanations = []
        for name, val in zip(self.feature_names, sv):
            impact = "Increases Risk" if val > 0 else "Decreases Risk"
            strength = abs(val)
            explanations.append({
                "feature": name,
                "impact": impact,
                "score": float(val),
                "strength": float(strength)
            })
            
        # Sort by absolute impact
        explanations.sort(key=lambda x: x['strength'], reverse=True)
        return explanations[:5] # Top 5 reasons

if __name__ == "__main__":
    # Test (requires model.pkl)
    try:
        explainer = ModelExplainer()
        test_features = [50, 2, 0, 0, 1, 2, 1, 10, 1, 5, 0]
        print(explainer.explain(test_features))
    except Exception as e:
        print(f"Error: {e}. Make sure to train the model first.")
