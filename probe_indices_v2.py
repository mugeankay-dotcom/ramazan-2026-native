
import requests

def probe_indices_v2():
    lat = 41.1278
    lng = 37.2831
    date = "25-01-2026"
    method = 13
    adjustment = 0
    
    # Baseline
    url0 = f"https://api.aladhan.com/v1/timings/{date}?latitude={lat}&longitude={lng}&method={method}&adjustment={adjustment}&tune=0,0,0,0,0,0,0,0,0"
    res0 = requests.get(url0).json()['data']['timings']

    # Probe 9 values
    # Indices: 0:10, 1:20, 2:30, 3:40, 4:50, 5:60, 6:70, 7:80, 8:90
    tune = "10,20,30,40,50,60,70,80,90"
    url1 = f"https://api.aladhan.com/v1/timings/{date}?latitude={lat}&longitude={lng}&method={method}&adjustment={adjustment}&tune={tune}"
    res1 = requests.get(url1).json()['data']['timings']

    print("--- MAPPING ANALYSIS ---")
    keys = ["Imsak", "Fajr", "Sunrise", "Dhuhr", "Asr", "Sunset", "Maghrib", "Isha", "Midnight"]
    
    for k in keys:
        t0 = res0[k].split(' ')[0]
        t1 = res1[k].split(' ')[0]
        
        h0, m0 = map(int, t0.split(':'))
        h1, m1 = map(int, t1.split(':'))
        
        diff = (h1*60 + m1) - (h0*60 + m0)
        
        # Identify which Index matches the Diff
        # 10->idx0, 20->idx1 ... 90->idx8
        match_idx = "NONE"
        if diff == 10: match_idx = "0"
        elif diff == 20: match_idx = "1"
        elif diff == 30: match_idx = "2"
        elif diff == 40: match_idx = "3"
        elif diff == 50: match_idx = "4"
        elif diff == 60: match_idx = "5"
        elif diff == 70: match_idx = "6"
        elif diff == 80: match_idx = "7"
        elif diff == 90: match_idx = "8"
        
        print(f"{k:<10} Baseline: {t0} | Probe: {t1} | Diff: {diff} min | MAPS TO INDEX: {match_idx}")

if __name__ == "__main__":
    probe_indices_v2()
