
import requests

def probe_maghrib():
    lat = 41.1278
    lng = 37.2831
    date = "25-01-2026"
    
    # Baseline (All zero)
    url0 = f"https://api.aladhan.com/v1/timings/{date}?latitude={lat}&longitude={lng}&method=13&adjustment=0&tune=0,0,0,0,0,0,0,0,0"
    base = requests.get(url0).json()['data']['timings']['Maghrib']
    print(f"Baseline Maghrib: {base}")
    
    # Probe Index 5 (Value 60)
    url5 = f"https://api.aladhan.com/v1/timings/{date}?latitude={lat}&longitude={lng}&method=13&adjustment=0&tune=0,0,0,0,0,60,0,0,0"
    res5 = requests.get(url5).json()['data']['timings']['Maghrib']
    print(f"Tune Index 5=60 Maghrib: {res5}")
    
    # Probe Index 6 (Value 60)
    url6 = f"https://api.aladhan.com/v1/timings/{date}?latitude={lat}&longitude={lng}&method=13&adjustment=0&tune=0,0,0,0,0,0,60,0,0"
    res6 = requests.get(url6).json()['data']['timings']['Maghrib']
    print(f"Tune Index 6=60 Maghrib: {res6}")

if __name__ == "__main__":
    probe_maghrib()
