
import requests
import json

def fetch_unye_prayers():
    # Samsun Unye Coordinates
    lat = 41.1278
    lng = 37.2831
    date = "25-01-2026"
    method = 13
    
    # Testing Hybrid Tune Candidate
    # Imsak+10, Fajr+10, Sun 0, Dhuhr 0, Asr 0, Maghrib 0 (Fix in code), Isha -1 (Fix here), Mid 0
    tune = "10,10,0,0,0,0,0,-1,0"
    adjustment = 0
    
    url = f"https://api.aladhan.com/v1/timings/{date}?latitude={lat}&longitude={lng}&method={method}&adjustment={adjustment}&tune={tune}"
    
    print(f"Fetching: {url}")
    
    try:
        response = requests.get(url)
        data = response.json()
        timings = data['data']['timings']
        
        print("\n--- APP CALCULATION (Unye) ---")
        print(f"Imsak:   {timings['Imsak']}")
        print(f"Sunrise: {timings['Sunrise']}")
        print(f"Dhuhr:   {timings['Dhuhr']}")
        print(f"Asr:     {timings['Asr']}")
        print(f"Maghrib: {timings['Maghrib']}")
        print(f"Isha:    {timings['Isha']}")
        
        print("\n--- OFFICIAL DIYANET (Unye) ---")
        print("Imsak:   06:12")
        print("Sunrise: 07:41")
        print("Dhuhr:   12:48")
        print("Asr:     15:21")
        print("Maghrib: 17:45")
        print("Isha:    19:08")

        # Define targets
        targets = {
            "Imsak": "06:12",
            "Sunrise": "07:41",
            "Dhuhr": "12:48",
            "Asr": "15:21",
            "Maghrib": "17:45",
            "Isha": "19:08"
        }

        print("\n--- DIFFERENCE ---")
        for p, target in targets.items():
            app_time = timings[p].split(' ')[0] # Remove (EEST) if any
            
            # Simple diff calc
            h1, m1 = map(int, app_time.split(':'))
            h2, m2 = map(int, target.split(':'))
            diff = (h1*60 + m1) - (h2*60 + m2)
            
            status = "PERFECT" if diff == 0 else f"Err: {diff} min"
            print(f"{p:<8} App: {app_time} | Real: {target} | {status}")

    except Exception as e:
        print(e)

if __name__ == "__main__":
    fetch_unye_prayers()
