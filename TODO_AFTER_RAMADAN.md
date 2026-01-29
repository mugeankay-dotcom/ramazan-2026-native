# Ramazan 2026 - Ramazan Sonrası Yapılacaklar

> **Not:** Bu işlemler Ramazan bitene kadar (Mart 2026 sonrası) bekletilecek.
> Uygulama şu an stabil ve çalışıyor. Risk almaya gerek yok.

---

## Mevcut Durum (29 Ocak 2026)

| Kategori | Puan | Durum |
|----------|------|-------|
| Kod Kalitesi | 7/10 | TypeScript iyi, büyük dosyalar var |
| Mimari | 7/10 | Context API iyi, component ayrımı geliştirilebilir |
| Performans | 6/10 | Interval bazlı kontrol optimize edilebilir |
| UX | 8/10 | Akıllı öneri sistemi mükemmel |
| Güvenlik | 10/10 | Tüm önlemler alındı |
| Test | 3/10 | Test altyapısı yok |

**Genel Puan: 7/10**

---

## 1. Kod Organizasyonu (Yüksek Öncelik)

### 1.1 HomeScreen Refactor
**Dosya:** `src/screens/HomeScreen.tsx` (~1100 satır)

**Yapılacak:**
- [ ] `CountdownSection.tsx` - Geri sayım bileşeni
- [ ] `PrayerGrid.tsx` - Namaz vakitleri grid'i
- [ ] `ImsakiyeModal.tsx` - İmsakiye modal'ı
- [ ] `PrayerAlertModal.tsx` - Ezan uyarı modal'ı (zaten var, kullanılmalı)

**Risk:** Orta - Props doğru geçirilmeli
**Süre:** 2-3 saat

### 1.2 Menu Modal Ortak Component
**Sorun:** Aynı menü kodu 6 ekranda tekrarlanıyor (~300 satır tekrar)

**Yapılacak:**
- [ ] `src/components/MenuModal.tsx` oluştur
- [ ] Tüm ekranlardan tekrarlanan kodu kaldır
- [ ] Navigation prop olarak geçir

**Risk:** Düşük - Sadece görsel component
**Süre:** 30 dakika

### 1.3 SettingsScreen Modal'ları
**Dosya:** `src/screens/SettingsScreen.tsx` (~855 satır)

**Yapılacak:**
- [ ] `CalculationMethodModal.tsx`
- [ ] `AsrSchoolModal.tsx`
- [ ] `HighLatitudeModal.tsx`
- [ ] `MidnightModeModal.tsx`

**Risk:** Düşük
**Süre:** 1 saat

---

## 2. Performans İyileştirmeleri (Orta Öncelik)

### 2.1 Prayer Alert Optimizasyonu
**Mevcut:** 30 saniyede bir interval ile kontrol
**Öneri:** Scheduled notification kullan (zaten NotificationManager'da var)

**Yapılacak:**
- [ ] Interval yerine tam zamanlı notification schedule
- [ ] Background task için expo-task-manager değerlendir

**Risk:** Orta - Test gerektirir
**Süre:** 2 saat

### 2.2 useCallback/useMemo
**Yapılacak:**
- [ ] HomeScreen'deki fonksiyonları useCallback ile wrap et
- [ ] Hesaplanan değerleri useMemo ile cache'le

**Risk:** Düşük
**Süre:** 1 saat

### 2.3 Widget Optimizasyonu
**Yapılacak:**
- [ ] Widget'ı sadece veri değiştiğinde güncelle
- [ ] Deep comparison ekle

**Risk:** Düşük
**Süre:** 30 dakika

---

## 3. Test Altyapısı (Orta Öncelik)

### 3.1 Jest Kurulumu
```bash
npm install --save-dev jest @testing-library/react-native @types/jest
```

**Yapılacak:**
- [ ] Jest config oluştur
- [ ] Test script'leri ekle

### 3.2 Kritik Testler
- [ ] `holidays2026.ts` - Tarih kontrolü
- [ ] `i18n.ts` - Çeviri fonksiyonları
- [ ] `NotificationManager.ts` - Bildirim planlaması

**Risk:** Yok
**Süre:** 2 saat

---

## 4. Uzun Vadeli (Opsiyonel)

### 4.1 iOS Build
- [ ] Apple Developer hesabı gerekli
- [ ] iOS izinleri ve konfigürasyonu
- [ ] TestFlight beta testi

### 4.2 CI/CD Pipeline
- [ ] GitHub Actions workflow
- [ ] Otomatik build ve test
- [ ] Play Store otomatik deploy

### 4.3 Crashlytics
- [ ] Firebase Crashlytics entegrasyonu
- [ ] Hata raporlama
- [ ] Analytics

---

## Tamamlanan İşlemler ✅

- [x] Versiyon bilgisi dinamik yapıldı (29 Ocak 2026)
- [x] Güvenlik 10/10'a çıkarıldı (29 Ocak 2026)
  - debug dosyaları git'ten kaldırıldı
  - .gitignore güncellendi
- [x] Kandil tarihleri Diyanet'e göre düzeltildi
- [x] Türkiye resmi tatilleri düzeltildi
- [x] Konum gösterimi İl/İlçe formatına düzeltildi
- [x] 5 vakit namaz + sahur/iftar uyarı sistemi eklendi
- [x] Koordinat bazlı hesaplama metodu önerisi eklendi
- [x] Uygulama açılışında geçmiş vakit alert sorunu çözüldü

---

## Notlar

- Ramazan: 19 Şubat - 21 Mart 2026 (Bayram: 21-23 Mart)
- Bu süre içinde uygulamaya dokunmamak en güvenlisi
- Acil bir bug olmadıkça değişiklik yapılmamalı
- Tüm değişiklikler Ramazan sonrası test edilmeli

---

*Son güncelleme: 29 Ocak 2026*
