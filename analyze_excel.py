import pandas as pd
import requests
import json
from datetime import datetime

# 1. Read Excel - Look for header
file_path = "Maltepe Namaz Vakitleri  Diyanet İşleri Başkanlığı.xlsx"
df_raw = pd.read_excel(file_path, header=None)

# Find row containing "Tarih"
header_row_idx = -1
for i, row in df_raw.iterrows():
    if row.astype(str).str.contains('Tarih', case=False).any():
        header_row_idx = i
        break

if header_row_idx == -1:
    print("Could not find header row with 'Tarih'")
    exit()

# Reload with correct header
df = pd.read_excel(file_path, header=header_row_idx)
print("Found Header at row:", header_row_idx)
print("Columns:", df.columns.tolist())

# Normalize Dates
# Assuming the Excel has a 'Tarih' column. Let's find columns.
# It might be 'Tarih', 'İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'

# Analyze Date Format
print("Sample Dates from Excel:")
print(df['Miladi Tarih'].head())

# Function to fetch API (single day)
def get_api_times(day, month, year):
    url = f"https://api.aladhan.com/v1/timings/{day}-{month}-{year}?latitude=41.0082&longitude=28.9784&method=13"
    try:
        r = requests.get(url)
        return r.json()['data']['timings']
    except:
        return None

target_dates_set = {'28.01.2026', '29.01.2026', '19.02.2026'}

month_map = {
    'Ocak': '01', 'Şubat': '02', 'Mart': '03', 'Nisan': '04', 'Mayıs': '05', 'Haziran': '06',
    'Temmuz': '07', 'Ağustos': '08', 'Eylül': '09', 'Ekim': '10', 'Kasım': '11', 'Aralık': '12'
}

print(f"{'Date':<12} | {'Prayer':<8} | {'Excel':<6} | {'API':<6} | {'Diff'}")
print("-" * 50)

for index, row in df.iterrows():
    raw_date = str(row['Miladi Tarih']) # "28 Ocak 2026 Çarşamba"
    
    # Custom Parse
    try:
        parts = raw_date.split()
        if len(parts) >= 3:
            day = parts[0].zfill(2)
            month_name = parts[1]
            year = parts[2]
            
            if month_name in month_map:
                month = month_map[month_name]
                date_str_chk = f"{day}.{month}.{year}"
                
                if date_str_chk in target_dates_set:
                    api_times = get_api_times(day, month, year)
                    if api_times:
                        map_p = {
                            'İmsak': 'Imsak', 'Güneş': 'Sunrise', 'Öğle': 'Dhuhr', 
                            'İkindi': 'Asr', 'Akşam': 'Maghrib', 'Yatsı': 'Isha'
                        }
                        
                        for excel_col, api_key in map_p.items():
                            if excel_col in row:
                                exc_time = str(row[excel_col])[:5]
                                api_time = api_times[api_key]
                                
                                h1, m1 = map(int, exc_time.split(':'))
                                h2, m2 = map(int, api_time.split(':'))
                                diff = (h1*60 + m1) - (h2*60 + m2)
                                
                                print(f"{date_str_chk:<12} | {api_key:<8} | {exc_time:<6} | {api_time:<6} | {diff:+d} min")
    except Exception as e:
        # print(f"Parse error: {e}")
        continue
