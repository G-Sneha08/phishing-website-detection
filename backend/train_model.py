import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import joblib
import os
from feature_extractor import FeatureExtractor

def generate_synthetic_data(n_samples=2000):
    """Generates a synthetic dataset for phishing detection if no CSV is present."""
    extractor = FeatureExtractor()
    data = []
    
    # Define some "seed" domains
    benign_seeds = ["google.com", "github.com", "stackoverflow.com", "microsoft.com", "apple.com", "amazon.com", "linkedin.com", "netflix.com"]
    phish_seeds = ["secure-login", "bank-update", "verify-account", "paypal-secure", "ebay-signin", "wallet-connect", "claim-reward"]
    
    for i in range(n_samples):
        is_phishing = i < (n_samples // 2)
        
        if is_phishing:
            seed = np.random.choice(phish_seeds)
            tld = np.random.choice([".info", ".xyz", ".top", ".online", ".support"])
            sub = "www." + np.random.choice(["verify", "login", "admin"]) + "."
            url = f"http://{sub}{seed}{tld}/{np.random.choice(['secure', 'update', 'login'])}?id={np.random.randint(1000, 9999)}"
        else:
            seed = np.random.choice(benign_seeds)
            url = f"https://www.{seed}/{np.random.choice(['docs', 'main', 'profile', 'search'])}"
            
        features = extractor.get_features_list(url)
        features.append(1 if is_phishing else 0)
        data.append(features)
        
    columns = [
        'url_length', 'num_dots', 'has_ip', 'has_https', 'num_subdomains',
        'suspicious_words_count', 'has_hyphen', 'path_length', 
        'special_chars_count', 'digit_count', 'has_redirection', 'target'
    ]
    return pd.DataFrame(data, columns=columns)

def train_and_evaluate():
    print("Generating/Loading dataset...")
    data_path = 'data/phishing_dataset.csv'
    
    if not os.path.exists('data'):
        os.makedirs('data')
        
    if os.path.exists(data_path):
        df = pd.read_csv(data_path)
    else:
        df = generate_synthetic_data()
        df.to_csv(data_path, index=False)
        print(f"Synthetic dataset created at {data_path}")

    X = df.drop('target', axis=1)
    y = df['target']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    models = {
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
        'XGBoost': XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42),
        'SVM': SVC(probability=True, random_state=42)
    }
    
    best_model = None
    best_accuracy = 0
    results = {}

    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        
        acc = accuracy_score(y_test, y_pred)
        results[name] = {
            'accuracy': acc,
            'precision': precision_score(y_test, y_pred),
            'recall': recall_score(y_test, y_pred),
            'f1': f1_score(y_test, y_pred)
        }
        
        print(f"{name} Accuracy: {acc:.4f}")
        
        if acc > best_accuracy:
            best_accuracy = acc
            best_model = model
            best_model_name = name

    print(f"\nBest Model: {best_model_name} with Accuracy: {best_accuracy:.4f}")
    
    # Save best model
    joblib.dump(best_model, 'model.pkl')
    print("Model saved as model.pkl")
    
    return results

if __name__ == "__main__":
    train_and_evaluate()
