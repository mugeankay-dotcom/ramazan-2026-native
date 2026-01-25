
import requests
import json
from datetime import datetime, timedelta

# Hybrid Logic Parameters
TUNE = "10,10,0,0,0,0,0,-1,0"
ADJUSTMENT = 0

def fetch_city(city_name, lat, lng, targets):
    url = f"https://api.aladhan.com/v1/timings/25-01-2026?latitude={lat}&longitude={lng}&method=13&adjustment={ADJUSTMENT}&tune={TUNE}"
    try:
        response = requests.get(url)
        data = response.json()
        timings = data['data']['timings']
        
        # APPLY MAGHRIB PATCH (-1 min)
        mag_str = timings['Maghrib'].split(' ')[0]
        h, m = map(int, mag_str.split(':'))
        # Subtract 1 min
        m -= 1
        if m < 0:
            m = 59
            h -= 1
        patched_maghrib = f"{h:02d}:{m:02d}"
        
        # Construct result map
        results = {
            "Imsak": timings['Imsak'].split(' ')[0],
            "Sunrise": timings['Sunrise'].split(' ')[0],
            "Dhuhr": timings['Dhuhr'].split(' ')[0],
            "Asr": timings['Asr'].split(' ')[0],
            "Maghrib": patched_maghrib,
            "Isha": timings['Isha'].split(' ')[0]
        }
        
        print(f"\n--- {city_name.upper()} ---")
        total_diff = 0
        for p, target in targets.items():
            res = results[p]
            h1, m1 = map(int, res.split(':'))
            h2, m2 = map(int, target.split(':'))
            diff = (h1*60 + m1) - (h2*60 + m2)
            
            status = "PERFECT" if diff == 0 else f"ERR {diff} min"
            print(f"{p:<8} App: {res} | Real: {target} | {status}")
            total_diff += abs(diff)
            
        if total_diff == 0:
            print(f">>> {city_name} VERIFIED 100% <<<")
        else:
            print(f">>> {city_name} FAILED (Diff {total_diff}) <<<")
            
    except Exception as e:
        print(f"Error for {city_name}: {e}")

if __name__ == "__main__":
    # 1. Istanbul
    fetch_city("Istanbul", 41.0082, 28.9784, {
        "Imsak": "06:46", "Sunrise": "08:13", "Dhuhr": "13:28", 
        "Asr": "16:03", "Maghrib": "18:21", "Isha": "19:54"
    })
    
    # 2. Ankara
    fetch_city("Ankara", 39.9334, 32.8597, {
        "Imsak": "06:29", "Sunrise": "07:56", "Dhuhr": "13:06",
        "Asr": "15:42", "Maghrib": "18:06", "Isha": "19:27"
    })
    
    # 3. Izmir
    fetch_city("Izmir", 38.4192, 27.1287, {
        "Imsak": "06:51", "Sunrise": "08:15", "Dhuhr": "13:29",
        "Asr": "16:09", "Maghrib": "18:32", "Isha": "19:52"
    })
    
    # 4. Erzurum
    fetch_city("Erzurum", 39.9043, 41.2679, {
        "Imsak": "05:55", "Sunrise": "07:22", "Dhuhr": "12:32",
        "Asr": "15:08", "Maghrib": "17:32", "Isha": "18:54"
    })
    
    # 5. Diyarbakir
    fetch_city("Diyarbakir", 37.9144, 40.2306, {
        "Imsak": "05:58", "Sunrise": "07:22", "Dhuhr": "12:36",
        "Asr": "15:17", "Maghrib": "17:41", "Isha": "19:00"
    })

    # 6. Samsun (Unye)
    fetch_city("Unye", 41.1278, 37.2831, {
        "Imsak": "06:12", "Sunrise": "07:41", "Dhuhr": "12:48",
        "Asr": "15:21", "Maghrib": "17:45", "Isha": "19:08"
    })
