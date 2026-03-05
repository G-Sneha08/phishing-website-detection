import requests
import sys

BASE_URL = "http://localhost:5000"

def test_endpoint(method, path, data=None):
    url = f"{BASE_URL}{path}"
    print(f"Testing {method} {url}...")
    try:
        if method == "GET":
            response = requests.get(url)
        else:
            response = requests.post(url, json=data)
        
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"Connection failed: {e}")
        return False

def main():
    endpoints = [
        ("GET", "/analytics"),
        ("GET", "/history"),
        ("POST", "/predict", {"url": "http://google.com"}),
        ("POST", "/scan", {"url": "http://phish-site.net"})
    ]
    
    success = True
    for method, path, *data in endpoints:
        d = data[0] if data else None
        if not test_endpoint(method, path, d):
            success = False
            
    if success:
        print("\nAll endpoints verified successfully!")
    else:
        print("\nSome endpoints failed verification.")
        sys.exit(1)

if __name__ == "__main__":
    main()
