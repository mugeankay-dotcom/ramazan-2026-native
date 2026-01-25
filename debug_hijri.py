import requests
import json

# Tune derived from Excel analysis: 
# Imsak: +9/10 -> +10
# Sunrise: -1/0 -> -1
# Dhuhr: -1/0 -> -1
# Asr: +1/0 -> +1
# Maghrib: -1 -> -1
# Isha: -1/-2 -> -2
tune = "10,10,-1,-1,1,-1,-1,-2,0" 
days = ["28", "29"]

print(f"Testing Tune: {tune}")
print("| Tarih | İmsak | Güneş | Öğle | İkindi | Akşam | Yatsı |")
print("|---|---|---|---|---|---|---|")

for day in days:
    url = f"https://api.aladhan.com/v1/timings/{day}-01-2026?latitude=41.0082&longitude=28.9784&method=13&adjustment=-1&tune={tune}"
    try:
        r = requests.get(url)
        d = r.json()
        t = d['data']['timings']
        print(f"| {day} Oca | {t['Imsak']} | {t['Sunrise']} | {t['Dhuhr']} | {t['Asr']} | {t['Maghrib']} | {t['Isha']} |")
    except Exception as e:
        print(f"Error {day}: {e}")
