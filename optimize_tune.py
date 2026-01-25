
import requests
import itertools

def get_timings(lat, lng, date, tune_str):
    url = f"https://api.aladhan.com/v1/timings/{date}?latitude={lat}&longitude={lng}&method=13&adjustment=0&tune={tune_str}"
    try:
        return requests.get(url).json()['data']['timings']
    except:
        return None

def time_to_min(t):
    h, m = map(int, t.split(':')[0:2])
    return h * 60 + m

def check_city(name, lat, lng, targets, tune_str):
    timings = get_timings(lat, lng, "25-01-2026", tune_str)
    if not timings: return 999
    
    total_diff = 0
    print(f"\n--- {name} ---")
    for p, target in targets.items():
        val = timings[p].split(' ')[0]
        diff = time_to_min(val) - time_to_min(target)
        print(f"{p}: App {val} | Real {target} | Diff {diff}")
        total_diff += abs(diff)
    return total_diff

def optimize():
    # Targets for 25 Jan 2026
    # Source: Diyanet (Verified via search previously for Unye, assuming Istanbul from memory/search)
    
    # Istanbul Diyanet 25 Jan 2026 (Need to verify, but using safe approximate based on Unye offset logic if needed, 
    # but better to fetch/verify. I'll assume my previous extensive Excel work for Istanbul was reliable 
    # and use the current derived baseline '10,10,-1,0,0,0,-1,1,0' as a starting point for Istanbul correctness, 
    # but I'll use Unye targets strictly).
    
    # Unye Targets (Strict)
    unye_targets = {
        "Imsak": "06:12",
        "Sunrise": "07:41",
        "Dhuhr": "12:48",
        "Asr": "15:21",
        "Maghrib": "17:45",
        "Isha": "19:08"
    }
    
    # Tunes to try for Maghrib (Index 6?) and Isha (Index 7?)
    # Aladhan Tune Order: Imsak, Sunrise, Dhuhr, Asr, Sunset, Maghrib, Isha, Midnight
    # My previous string: 10,10,0,0,0,0,-1,-2,0 (9 values?)
    # Let's try to adjust indices 6 (Maghrib) and 7 (Isha).
    # Current result with (..., -1, -2, 0): Maghrib +1 err, Isha -1 err.
    # To fix Maghrib (+1 err -> needs -1 min), change tune -1 to -2?
    # To fix Isha (-1 err -> needs +1 min), change tune -2 to -1?
    
    # Proposed Tune: 10,10,0,0,0,0,-2,-1,0
    tune_try = "10,10,0,0,0,0,-2,-1,0"
    
    print(f"Testing Tune: {tune_try}")
    diff = check_city("Unye", 41.1278, 37.2831, unye_targets, tune_try)
    print(f"Total Error Unye: {diff}")

if __name__ == "__main__":
    optimize()
