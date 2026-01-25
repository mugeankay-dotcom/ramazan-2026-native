
import requests

def probe_tune_indices():
    lat = 41.1278
    lng = 37.2831
    date = "25-01-2026"
    method = 13
    
    # 8 values usually: Imsak, Sunrise, Dhuhr, Asr, Sunset, Maghrib, Isha, Midnight
    # Let's set distinct large values to ID them.
    tune = "10,20,30,40,50,60,70,80"
    adjustment = 0
    
    url = f"https://api.aladhan.com/v1/timings/{date}?latitude={lat}&longitude={lng}&method={method}&adjustment={adjustment}&tune={tune}"
    
    print(f"Fetching: {url}")
    
    response = requests.get(url)
    data = response.json()
    timings = data['data']['timings']
    
    print("\n--- BASELINE (From previous test) ---")
    print("Imsak: 06:02")
    print("Sunrise: 07:41")
    print("Dhuhr: 12:48")
    print("Asr: 15:21")
    print("Sunset: ? (Calculated)")
    print("Maghrib: 17:46")
    print("Isha: 19:09")

    print("\n--- PROBE VALUES ---")
    for p, v in timings.items():
        print(f"{p}: {v}")

    # Calculate diffs
    # Imsak baseline 06:02. If index 0 is 10, should be 06:12.
    # Sunrise baseline 07:41. If index 1 is 20, should be 08:01.
    
if __name__ == "__main__":
    probe_tune_indices()
