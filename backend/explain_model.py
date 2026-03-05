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
        
        # Determine explainer type based on model
        if hasattr(self.model, "tree"): # For RF or XGBoost
            explainer = shap.TreeExplainer(self.model)
        else:
            explainer = shap.KernelExplainer(self.model.predict_proba, shap.sample(X, 10))
            
        shap_values = explainer.shap_values(X)
        
        # For binary classification, shap_values might be a list (index 1 is phishing)
        if isinstance(shap_values, list):
            sv = shap_values[1][0]
        else:
            sv = shap_values[0]

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
