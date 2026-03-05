import requests
import os

class ThreatIntelligence:
    def __init__(self):
        self.phishtank_api = os.getenv("PHISHTANK_API_KEY")
        self.google_safe_browsing_api = os.getenv("GOOGLE_SAFE_BROWSING_API_KEY")

    def check_phishtank(self, url):
        # Mocking implementation for portfolio completeness
        # In a real scenario, this would use: requests.post('https://checkurl.phishtank.com/checkurl/')
        suspicious_patterns = ['secure', 'update', 'verify', 'login', 'account']
        if any(pattern in url.lower() for pattern in suspicious_patterns) and "http://" in url:
            return {"status": "suspicious", "database": "PhishTank", "match": True}
        return {"status": "clean", "database": "PhishTank", "match": False}

    def check_google_safebrowing(self, url):
        # Mocking Google Safe Browsing
        # Real implementation requires a POST request to https://safebrowsing.googleapis.com/v4/threatMatches:find
        if "badsite.com" in url or "phish" in url:
            return {"status": "malicious", "database": "Google Safe Browsing", "match": True}
        return {"status": "clean", "database": "Google Safe Browsing", "match": False}

    def get_threat_all(self, url):
        pt = self.check_phishtank(url)
        gsb = self.check_google_safebrowing(url)
        
        results = [pt, gsb]
        matches = [r for r in results if r['match']]
        
        return {
            "is_malicious": len(matches) > 0,
            "reports": results,
            "threat_count": len(matches)
        }
