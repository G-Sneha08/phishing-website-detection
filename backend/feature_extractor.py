from urllib.parse import urlparse
import re
import socket
import whois
from datetime import datetime

class FeatureExtractor:
    def __init__(self):
        self.suspicious_words = ['login', 'verify', 'update', 'secure', 'account', 'banking', 'webscr', 'ebayisapi', 'signin']

    def extract_features(self, url):
        features = {}
        
        # Parse URL
        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        path = parsed_url.path
        
        # 1. URL Length
        features['url_length'] = len(url)
        
        # 2. Number of Dots
        features['num_dots'] = url.count('.')
        
        # 3. Has IP Address
        features['has_ip'] = 1 if re.match(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$', domain) else 0
        
        # 4. Has HTTPS
        features['has_https'] = 1 if parsed_url.scheme == 'https' else 0
        
        # 5. Number of Subdomains
        domain_parts = domain.split('.')
        features['num_subdomains'] = len(domain_parts) - 2 if len(domain_parts) > 2 else 0
        
        # 6. Suspicious Words Count
        features['suspicious_words_count'] = sum(1 for word in self.suspicious_words if word in url.lower())
        
        # 7. Prefix-Suffix (Hyphen in domain)
        features['has_hyphen'] = 1 if '-' in domain else 0
        
        # 8. Path Length
        features['path_length'] = len(path)
        
        # 9. Special Characters Count (@, !, ?, etc)
        features['special_chars_count'] = sum(1 for char in url if char in ['@', '?', '=', '&', '!'])
        
        # 10. Digit Count in URL
        features['digit_count'] = sum(1 for char in url if char.isdigit())
        
        # 11. Redirection (// in path)
        features['has_redirection'] = 1 if '//' in path else 0
        
        return features

    def get_features_list(self, url):
        features_dict = self.extract_features(url)
        # Order should match model training
        return [
            features_dict['url_length'],
            features_dict['num_dots'],
            features_dict['has_ip'],
            features_dict['has_https'],
            features_dict['num_subdomains'],
            features_dict['suspicious_words_count'],
            features_dict['has_hyphen'],
            features_dict['path_length'],
            features_dict['special_chars_count'],
            features_dict['digit_count'],
            features_dict['has_redirection']
        ]

if __name__ == "__main__":
    extractor = FeatureExtractor()
    test_url = "http://secure-login-verify.com/account/update"
    print(f"Features for {test_url}: {extractor.extract_features(test_url)}")
