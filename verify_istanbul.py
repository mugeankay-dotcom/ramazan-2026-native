
import requests

def verify_istanbul():
    # Istanbul official 25 Jan 2026: 
    # Imsak: 06:46, Sun: 08:13, Dhuhr: 13:28, Asr: 16:03, Mag: 18:21, Isha: 19:54
    targets = {
        "Imsak": "06:46", "Sunrise": "08:13", "Dhuhr": "13:28", 
        "Asr": "16:03", "Maghrib": "18:21", "Isha": "19:54"
    }
    
    # Baseline 0 tune
    url = "https://api.aladhan.com/v1/timings/25-01-2026?latitude=41.0082&longitude=28.9784&method=13&adjustment=0&tune=0,0,0,0,0,0,0,0,0"
    data = requests.get(url).json()['data']['timings']
    
    print("--- ISTANBUL BASELINE (0 Tune) ---")
    for p, target in targets.items():
        res = data[p].split(' ')[0]
        h1, m1 = map(int, res.split(':'))
        h2, m2 = map(int, target.split(':'))
        diff = (h1*60 + m1) - (h2*60 + m2)
        print(f"{p:<8} App: {res} | Real: {target} | Diff {diff}")

if __name__ == "__main__":
    verify_istanbul()
