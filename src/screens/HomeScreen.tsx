import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Modal,
    ActivityIndicator,
    Vibration,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Svg, { Polygon, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { Colors } from '../theme';
import AdBanner from '../components/AdBanner';
import {
    registerForPushNotificationsAsync,
    sendImmediateNotification,
    scheduleDailyPrayerNotifications,
    getScheduledNotifications,
    cancelAllScheduledNotifications
} from '../utils/NotificationManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { PrayerTimesWidget } from '../widget/PrayerTimesWidget';
import { t } from '../utils/i18n';
import { getDailyHadith } from '../data/dailyHadiths';

// Font configuration
const serifFont = 'Cinzel_400Regular';
const serifBold = 'Cinzel_700Bold';
const GOLD_COLOR = '#C5A059';
const TEXT_GOLD = '#F0E68C';

const { width } = Dimensions.get('window');
const RAMADAN_START_DATE = '2026-02-19';
const RAMADAN_START = new Date(RAMADAN_START_DATE + 'T00:00:00');
const API_URL = 'https://api.aladhan.com/v1/calendar';

export default function HomeScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { userLocation, setUserLocation, userCity, setUserCity, soundEnabled, vibrationEnabled, language, calculationMethod, asrSchool, highLatitudeMethod, midnightMode } = useApp();

    // Yüksek enlem hesaplama metodu belirleme
    const getHighLatitudeMethod = (latitude: number): number | null => {
        // Manuel seçim varsa onu kullan
        if (highLatitudeMethod !== '0') {
            return parseInt(highLatitudeMethod);
        }

        // Otomatik algılama
        const absLat = Math.abs(latitude);
        if (absLat >= 65) return 3;      // Angle Based (İskandinav ülkeleri, Alaska)
        if (absLat >= 55) return 2;      // One Seventh (İngiltere, Kanada, Rusya)
        if (absLat >= 48) return 1;      // Middle of Night (Almanya kuzeyi, Polonya)
        return null;                      // Normal enlem, düzeltme gerekmez
    };

    // State
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [countdownLabel, setCountdownLabel] = useState('countdownPreRamadan');
    const [countdownTargetName, setCountdownTargetName] = useState('ramadanYear');

    const [todayPrayers, setTodayPrayers] = useState<any>(null);
    const [nextPrayerTime, setNextPrayerTime] = useState<Date | null>(null);

    const [imsakiyeData, setImsakiyeData] = useState<any[]>([]);
    const [showImsakiye, setShowImsakiye] = useState(false);
    const [loadingImsakiye, setLoadingImsakiye] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // Iftar Warning Modal
    const [showIftarAlert, setShowIftarAlert] = useState(false);


    // Track alerts to avoid double triggering
    const triggeredAlerts = useRef<Set<string>>(new Set());

    // Force re-render on language change
    useEffect(() => {
        // Just triggering a state update to refresh strings
        setCountdownLabel(prev => prev);
    }, [language]);

    useEffect(() => {
        setupNotifications();
        fetchLocation();
    }, []);

    // Countdown timer - her saniye güncellenir
    useEffect(() => {
        const timer = setInterval(() => {
            updateCountdown();
        }, 1000);
        return () => clearInterval(timer);
    }, [todayPrayers]);

    // Prayer alert checker - her dakika kontrol eder
    useEffect(() => {
        if (!todayPrayers) return;

        // İlk yüklemede hemen kontrol et
        const now = new Date();
        const isRamadan = now >= RAMADAN_START;
        checkPrayerAlerts(todayPrayers, now, isRamadan);

        // Her dakika başında kontrol et (daha verimli)
        const alertTimer = setInterval(() => {
            const currentTime = new Date();
            const isRamadanNow = currentTime >= RAMADAN_START;
            checkPrayerAlerts(todayPrayers, currentTime, isRamadanNow);
        }, 30000); // 30 saniyede bir kontrol et (1 dakikalık pencereyi kaçırmamak için)

        return () => clearInterval(alertTimer);
    }, [todayPrayers, soundEnabled, vibrationEnabled]);

    useEffect(() => {
        if (userLocation) {
            fetchTodayPrayers(userLocation.lat, userLocation.lng);
        }
    }, [userLocation, calculationMethod, asrSchool, highLatitudeMethod, midnightMode]);

    // Fetch Full Imsakiye Data when modal opens
    useEffect(() => {
        if (showImsakiye && userLocation && imsakiyeData.length === 0) {
            fetchRamadanCalendar(userLocation.lat, userLocation.lng);
        }
    }, [showImsakiye]);

    const setupNotifications = async () => {
        await registerForPushNotificationsAsync();
    };

    // Widget verilerini kaydet ve güncelle
    const updateWidgetData = async (prayerTimes: any, location: { lat: number; lng: number } | null) => {
        try {
            // Konum adını al (ters geocoding)
            let locationName = 'Konum bekleniyor';
            if (location) {
                try {
                    const [address] = await Location.reverseGeocodeAsync({
                        latitude: location.lat,
                        longitude: location.lng,
                    });
                    if (address) {
                        locationName = address.city || address.district || address.subregion || 'Bilinmeyen';
                        // Şehir adını global state'e kaydet (ayarlarda göstermek için)
                        setUserCity(locationName);
                    }
                } catch (e) {
                    console.log('Reverse geocode error:', e);
                }
            }

            // Widget verilerini AsyncStorage'a kaydet
            const widgetData = {
                prayerTimes: {
                    Imsak: prayerTimes.Imsak?.split(' ')[0],
                    Fajr: prayerTimes.Fajr?.split(' ')[0],
                    Sunrise: prayerTimes.Sunrise?.split(' ')[0],
                    Dhuhr: prayerTimes.Dhuhr?.split(' ')[0],
                    Asr: prayerTimes.Asr?.split(' ')[0],
                    Maghrib: prayerTimes.Maghrib?.split(' ')[0],
                    Isha: prayerTimes.Isha?.split(' ')[0],
                },
                location: locationName,
                lastUpdate: new Date().toISOString(),
            };
            await AsyncStorage.setItem('widgetData', JSON.stringify(widgetData));

            // Widget'ı güncelle
            const now = new Date();
            const isRamadan = now >= RAMADAN_START;
            const isBeforeRamadan = now < RAMADAN_START;

            // Sonraki namaz/hedef hesapla
            const getNextTarget = () => {
                const parseTimeToDate = (timeStr: string): Date => {
                    const [hours, minutes] = timeStr.split(':').map(Number);
                    const d = new Date();
                    d.setHours(hours, minutes, 0, 0);
                    return d;
                };

                if (isBeforeRamadan) {
                    const days = Math.ceil((RAMADAN_START.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                    const diff = RAMADAN_START.getTime() - now.getTime();
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    return {
                        name: 'Ramazan 2026',
                        time: `${days} gün`,
                        countdown: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
                        targetType: 'prayer' as const,
                    };
                }

                // Ramazan döneminde
                if (isRamadan && prayerTimes.Imsak) {
                    const imsakTime = parseTimeToDate(prayerTimes.Imsak.split(' ')[0]);
                    if (now < imsakTime) {
                        const diff = imsakTime.getTime() - now.getTime();
                        const hours = Math.floor(diff / (1000 * 60 * 60));
                        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                        return {
                            name: t('prayers.Imsak'),
                            time: prayerTimes.Imsak.split(' ')[0],
                            countdown: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
                            targetType: 'imsak' as const,
                        };
                    }
                }

                if (prayerTimes.Maghrib) {
                    const maghribTime = parseTimeToDate(prayerTimes.Maghrib.split(' ')[0]);
                    if (now < maghribTime) {
                        const diff = maghribTime.getTime() - now.getTime();
                        const hours = Math.floor(diff / (1000 * 60 * 60));
                        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                        return {
                            name: isRamadan ? 'İftar' : t('prayers.Maghrib'),
                            time: prayerTimes.Maghrib.split(' ')[0],
                            countdown: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
                            targetType: isRamadan ? 'iftar' as const : 'prayer' as const,
                        };
                    }
                }

                // Diğer namazları kontrol et
                const prayers = [
                    { key: 'Fajr', name: t('prayers.Fajr') },
                    { key: 'Dhuhr', name: t('prayers.Dhuhr') },
                    { key: 'Asr', name: t('prayers.Asr') },
                    { key: 'Isha', name: t('prayers.Isha') },
                ];

                for (const prayer of prayers) {
                    const timeStr = prayerTimes[prayer.key];
                    if (timeStr) {
                        const prayerTime = parseTimeToDate(timeStr.split(' ')[0]);
                        if (now < prayerTime) {
                            const diff = prayerTime.getTime() - now.getTime();
                            const hours = Math.floor(diff / (1000 * 60 * 60));
                            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                            return {
                                name: prayer.name,
                                time: timeStr.split(' ')[0],
                                countdown: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
                                targetType: 'prayer' as const,
                            };
                        }
                    }
                }

                // Tüm namazlar geçtiyse yarının sabah namazı
                return {
                    name: `${t('prayers.Fajr')} (yarın)`,
                    time: prayerTimes.Fajr?.split(' ')[0] || '--:--',
                    countdown: '--:--:--',
                    targetType: 'prayer' as const,
                };
            };

            const target = getNextTarget();

            // Widget'ı güncelle (Platform.OS kontrolü)
            if (Platform.OS === 'android') {
                await requestWidgetUpdate({
                    widgetName: 'PrayerTimesWidget',
                    renderWidget: () => (
                        <PrayerTimesWidget
                            nextPrayer={target.name}
                            nextPrayerTime={target.time}
                            countdown={target.countdown}
                            location={locationName}
                            isRamadan={isRamadan}
                            targetType={target.targetType}
                        />
                    ),
                    widgetNotFound: () => {
                        console.log('Widget not found on home screen');
                    },
                });
                console.log('✅ Widget güncellendi');
            }
        } catch (error) {
            console.log('Widget update error:', error);
        }
    };

    const fetchLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setUserLocation({ lat: 41.0082, lng: 28.9784 }); // Istanbul default
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setUserLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
        } catch {
            setUserLocation({ lat: 41.0082, lng: 28.9784 });
        }
    };

    const fetchTodayPrayers = async (lat: number, lng: number) => {
        try {
            const date = new Date();

            // API URL parametrelerini oluştur
            const params = new URLSearchParams({
                latitude: lat.toString(),
                longitude: lng.toString(),
                method: calculationMethod,
                school: asrSchool,           // Hanefi (1) veya Şafi (0)
                midnightMode: midnightMode,  // Standard (0) veya Jafari (1)
            });

            // Yüksek enlem düzeltmesi
            const highLatMethod = getHighLatitudeMethod(lat);
            if (highLatMethod !== null) {
                params.append('latitudeAdjustmentMethod', highLatMethod.toString());
            }

            // Diyanet için özel ayarlar (Method 13)
            // DİKKAT: Diyanet İşleri Başkanlığı, ikindi vakti için Şafi metodunu kullanır
            // Bu yüzden Diyanet seçildiğinde school parametresini 0 (Şafi) yapıyoruz
            if (calculationMethod === '13') {
                // Sadece İmsak için +10 dakika temkin süresi
                params.append('tune', "10,0,0,0,0,0,0,0,0");
                // Diyanet için Şafi okulu zorla (ikindi vakti için)
                params.set('school', '0');
            }

            // Timezone otomatik algılama
            try {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                params.append('timezonestring', timezone);
            } catch (e) {
                // Timezone alınamazsa API kendi hesaplayacak
            }

            const apiUrl = `https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?${params.toString()}`;

            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.code === 200) {
                const timings = data.data.timings;
                setTodayPrayers(timings);
                updateLogic(timings); // Immediate update

                // Widget verilerini kaydet ve güncelle
                await updateWidgetData(timings, userLocation);

                // Bildirim planlaması - Günde sadece bir kez yapılacak (ayarlar değişmediyse)
                const todayStr = new Date().toISOString().split('T')[0];
                const settingsKey = `${calculationMethod}-${asrSchool}-${highLatitudeMethod}-${midnightMode}`;
                const scheduleKey = `${todayStr}-${settingsKey}`;
                const lastScheduleKey = await AsyncStorage.getItem('lastNotificationScheduleKey');

                // Eğer bugün henüz planlanmadıysa VEYA ayarlar değiştiyse planla
                if (lastScheduleKey !== scheduleKey) {
                    // Ramazan kontrolü - sadece Ramazan döneminde iftar/sahur mesajları
                    const isRamadan = new Date() >= RAMADAN_START;

                    await scheduleDailyPrayerNotifications(timings, {
                        imsak: t('prayers.Imsak'),
                        fajr: t('prayers.Fajr'),
                        sunrise: t('prayers.Sunrise'),
                        dhuhr: t('prayers.Dhuhr'),
                        asr: t('prayers.Asr'),
                        maghrib: t('prayers.Maghrib'),
                        isha: t('prayers.Isha'),
                        alertTitle: (prayer: string) => t('alertTitle', { prayer }),
                        alertBodyPrayer: t('alertBodyPrayer'),
                        alertBodyIftar: t('alertBodyIftar'),
                        alertBodySahur: t('alertBodySahur') || t('alertBodyPrayer'),
                    }, isRamadan, soundEnabled);

                    // Bugünün tarihini ve ayarları kaydet - bildirimlerin tekrar planlanmasını engeller
                    await AsyncStorage.setItem('lastNotificationScheduleKey', scheduleKey);
                    console.log('✅ Bildirimler planlandı:', todayStr, 'Ramazan:', isRamadan);
                }


            }
        } catch (e) {
            console.log("Prayer Fetch Error", e);
        }
    };

    // --- CORE LOGIC: COUNTDOWN (Sadece geri sayım) ---
    const updateCountdown = () => {
        const now = new Date();
        const prayers = todayPrayers;

        // 1. Check Pre-Ramadan
        if (now < RAMADAN_START) {
            setCountdownLabel('countdownPreRamadan');
            setCountdownTargetName('ramadanYear');
            updateCountdownState(RAMADAN_START, now);
            return;
        }

        if (!prayers) return;

        // Parse Times
        const imsakTime = parseTime(prayers.Imsak);
        const aksamTime = parseTime(prayers.Maghrib); // IFTAR

        // 2. Determine Phase
        let targetTime: Date;
        let label = "";
        let targetName = "";

        if (now < imsakTime) {
            // Night -> Sahur/Imsak
            targetTime = imsakTime;
            label = "countdownImsak";
            targetName = "targetSahur";
        } else if (now < aksamTime) {
            // Day -> Iftar
            targetTime = aksamTime;
            label = "countdownIftar";
            targetName = "targetIftar";
        } else {
            // After Iftar -> Tomorrow Imsak (Simplified: Today Imsak + 24h)
            targetTime = new Date(imsakTime);
            targetTime.setDate(targetTime.getDate() + 1);
            label = "countdownTomorrowImsak";
            targetName = "targetSahur";
        }

        setCountdownLabel(label);
        setCountdownTargetName(targetName);
        updateCountdownState(targetTime, now);
    };

    // Legacy function for initial load (called from fetchTodayPrayers)
    const updateLogic = (prayers: any) => {
        if (!prayers) return;
        // Just update countdown - alerts are handled by separate useEffect
        const now = new Date();

        if (now < RAMADAN_START) {
            setCountdownLabel('countdownPreRamadan');
            setCountdownTargetName('ramadanYear');
            updateCountdownState(RAMADAN_START, now);
            return;
        }

        const imsakTime = parseTime(prayers.Imsak);
        const aksamTime = parseTime(prayers.Maghrib);

        let targetTime: Date;
        let label = "";
        let targetName = "";

        if (now < imsakTime) {
            targetTime = imsakTime;
            label = "countdownImsak";
            targetName = "targetSahur";
        } else if (now < aksamTime) {
            targetTime = aksamTime;
            label = "countdownIftar";
            targetName = "targetIftar";
        } else {
            targetTime = new Date(imsakTime);
            targetTime.setDate(targetTime.getDate() + 1);
            label = "countdownTomorrowImsak";
            targetName = "targetSahur";
        }

        setCountdownLabel(label);
        setCountdownTargetName(targetName);
        updateCountdownState(targetTime, now);
    };

    const updateCountdownState = (target: Date, now: Date) => {
        const diff = target.getTime() - now.getTime();
        if (diff > 0) {
            setCountdown({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            });
        } else {
            setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    };

    const parseTime = (timeStr: string): Date => {
        const [h, m] = timeStr.split(':').map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
    };

    const checkPrayerAlerts = (prayers: any, now: Date, isRamadan: boolean = false) => {
        if (!prayers) return;

        const checkList = [
            { id: 'Dhuhr', nameKey: 'prayers.Dhuhr', isIftar: false },
            { id: 'Asr', nameKey: 'prayers.Asr', isIftar: false },
            { id: 'Maghrib', nameKey: 'prayers.Maghrib', isIftar: true },
            { id: 'Isha', nameKey: 'prayers.Isha', isIftar: false },
        ];

        // Tarih bazlı key - ayar değişse bile aynı gün için tekrar alert gelmemeli
        const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

        checkList.forEach(p => {
            const timeStr = prayers[p.id];
            if (!timeStr) return;
            const time = parseTime(timeStr);

            // Ensure we are comparing same day
            if (time.getDate() !== now.getDate() || time.getMonth() !== now.getMonth() || time.getFullYear() !== now.getFullYear()) {
                return;
            }

            const diff = now.getTime() - time.getTime();
            const alertKey = `${todayKey}-${p.id}`;

            // CRITICAL FIX: Alert sadece tam vakit anında tetiklenmeli (0-60 saniye arası)
            // VE daha önce tetiklenmemiş olmalı
            // VE uygulama yeni açıldığında geçmiş vakitler için alert GELMEMELİ

            // Eğer vakit 2 dakikadan fazla geçmişse (ayar değişikliği veya uygulama açılışı),
            // bu eski bir vakit demektir - alert tetiklenmemeli
            const MAX_ALERT_WINDOW = 60000; // 60 saniye - sadece bu pencerede alert ver
            const isWithinAlertWindow = diff >= 0 && diff < MAX_ALERT_WINDOW;
            const alreadyTriggered = triggeredAlerts.current.has(alertKey);

            if (isWithinAlertWindow && !alreadyTriggered) {
                // TRIGGER ALERT
                triggeredAlerts.current.add(alertKey);

                const prayerName = t(p.nameKey);
                const title = t('alertTitle', { prayer: prayerName });
                // If Ramadan and Iftar, use Iftar message, otherwise use prayer message
                const body = (p.isIftar && isRamadan) ? t('alertBodyIftar') : t('alertBodyPrayer');

                // 1. Notification
                sendImmediateNotification(title, body, soundEnabled);

                // 2. Vibration
                if (vibrationEnabled) {
                    Vibration.vibrate([0, 500, 200, 500]);
                }

                // 3. Special On-Screen Warning for Iftar - ONLY during Ramadan
                if (p.isIftar && isRamadan) {
                    setShowIftarAlert(true);
                }
            } else if (diff >= MAX_ALERT_WINDOW && !alreadyTriggered) {
                // Vakit geçmiş ama triggeredAlerts'a eklenmemiş - ekle ki bir daha kontrol etmesin
                // Bu sayede ayar değişikliğinde eski vakitler için alert gelmez
                triggeredAlerts.current.add(alertKey);
            }
        });
    };

    // --- IMSAKIYE DATA FETCHING ---
    const fetchRamadanCalendar = async (lat: number, lng: number) => {
        setLoadingImsakiye(true);
        try {
            // Ortak parametreleri oluştur
            const baseParams = new URLSearchParams({
                latitude: lat.toString(),
                longitude: lng.toString(),
                method: calculationMethod,
                school: asrSchool,
                midnightMode: midnightMode,
            });

            // Yüksek enlem düzeltmesi
            const highLatMethod = getHighLatitudeMethod(lat);
            if (highLatMethod !== null) {
                baseParams.append('latitudeAdjustmentMethod', highLatMethod.toString());
            }

            // Diyanet için özel ayarlar (Method 13)
            if (calculationMethod === '13') {
                baseParams.append('tune', "10,0,0,0,0,0,0,0,0");
                baseParams.set('school', '0'); // Diyanet Şafi kullanır
            }

            // Timezone
            try {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                baseParams.append('timezonestring', timezone);
            } catch (e) {}

            const apiUrl = `${API_URL}/2026/2?${baseParams.toString()}`;
            const apiUrlMar = `${API_URL}/2026/3?${baseParams.toString()}`;

            const [resFeb, resMar] = await Promise.all([
                fetch(apiUrl),
                fetch(apiUrlMar)
            ]);
            const dataFeb = await resFeb.json();
            const dataMar = await resMar.json();

            let allDays = [];
            if (dataFeb.code === 200) allDays.push(...dataFeb.data);
            if (dataMar.code === 200) allDays.push(...dataMar.data);

            const ramadanData = [];
            const startIndex = allDays.findIndex(d => d.date.gregorian.date === "19-02-2026");

            // Güvenli parse fonksiyonu - undefined veya hatalı değerler için
            const safeParseTime = (timeStr: string | undefined): string => {
                if (!timeStr || typeof timeStr !== 'string') return '--:--';
                const parts = timeStr.split(' ');
                return parts[0] || '--:--';
            };

            if (startIndex !== -1) {
                for (let i = 0; i < 29; i++) {
                    if (startIndex + i < allDays.length) {
                        const dayData = allDays[startIndex + i];
                        const timings = dayData?.timings || {};
                        const gregorian = dayData?.date?.gregorian || {};
                        const hijri = dayData?.date?.hijri || {};

                        ramadanData.push({
                            day: i + 1,
                            date: `${gregorian.day || '?'} ${(gregorian.month?.en || 'UNK').substring(0, 3).toUpperCase()}`,
                            dayName: getDayName(gregorian.weekday?.en || ''),
                            hijriDay: hijri.day || '?',
                            hijriYear: hijri.year || '1447',
                            imsak: safeParseTime(timings.Imsak),
                            gunes: safeParseTime(timings.Sunrise),
                            ogle: safeParseTime(timings.Dhuhr),
                            ikindi: safeParseTime(timings.Asr),
                            iftar: safeParseTime(timings.Maghrib),
                            yatsi: safeParseTime(timings.Isha)
                        });
                    }
                }
            }
            setImsakiyeData(ramadanData.length > 0 ? ramadanData : generateFallbackData());
        } catch (e) {
            console.error(e);
            setImsakiyeData(generateFallbackData());
        } finally {
            setLoadingImsakiye(false);
        }
    };

    const getDayName = (engName: string) => {
        const dayKey = engName.toLowerCase();
        const dayMap: any = {
            'monday': t('days.mon'),
            'tuesday': t('days.tue'),
            'wednesday': t('days.wed'),
            'thursday': t('days.thu'),
            'friday': t('days.fri'),
            'saturday': t('days.sat'),
            'sunday': t('days.sun')
        };
        return dayMap[dayKey] || engName.substring(0, 3).toUpperCase();
    }

    const generateFallbackData = () => {
        const rows = [];
        const startDate = new Date('2026-02-19');
        const days = ['PAZ', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT'];
        for (let i = 0; i < 29; i++) {
            const d = new Date(startDate); d.setDate(startDate.getDate() + i);
            rows.push({
                day: i + 1, date: `${d.getDate()} ŞUB`, dayName: days[d.getDay()],
                hijriDay: (i + 1).toString(), hijriYear: '1447', // Fallback Hijri data
                imsak: '05:58', gunes: '07:32', ogle: '13:22', ikindi: '16:20', iftar: '18:50', yatsi: '20:15'
            });
        }
        return rows;
    }

    // --- UI COMPONENTS ---
    const navigateTo = (screen: string) => {
        setShowMenu(false);
        navigation.navigate(screen);
    };

    const OctagonTimeUnit = ({ value, label }: { value: number; label: string }) => {
        const size = width * 0.18;
        const points = "30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30";
        return (
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" style={StyleSheet.absoluteFill}>
                    <Defs>
                        <SvgGradient id="octGrad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor="rgba(15, 25, 35, 0.85)" stopOpacity="1" />
                            <Stop offset="1" stopColor="rgba(5, 12, 18, 0.95)" stopOpacity="1" />
                        </SvgGradient>
                    </Defs>
                    <Polygon points={points} fill="url(#octGrad)" stroke={GOLD_COLOR} strokeWidth="2.5" />
                </Svg>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.hexNumber}>{value.toString().padStart(2, '0')}</Text>
                    <Text style={styles.hexLabel}>{label}</Text>
                </View>
            </View>
        );
    };

    const PrayerCard = ({ name, time }: { name: string; time: string }) => (
        <LinearGradient
            colors={['rgba(15, 25, 35, 0.9)', 'rgba(25, 35, 45, 0.85)', 'rgba(120, 95, 25, 0.35)']}
            locations={[0, 0.6, 1]}
            style={styles.prayerCard}
        >
            <View style={styles.prayerCardContent}>
                <Text style={styles.prayerName}>{name}</Text>
                <Ionicons name="time-outline" size={12} color="#aaa" style={{ marginVertical: 3 }} />
                <Text style={styles.prayerTime}>{time}</Text>
            </View>
        </LinearGradient>
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/masjid_bg.png')} style={styles.bgImage} imageStyle={{ opacity: 1, resizeMode: 'cover' }}>
                <LinearGradient colors={['rgba(2, 6, 12, 0.9)', 'rgba(5, 15, 30, 0.25)', 'rgba(2, 6, 12, 0.9)']} locations={[0, 0.4, 0.9]} style={styles.gradient}>
                    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                        <TouchableOpacity onPress={() => setShowMenu(true)}>
                            <Ionicons name="menu" size={32} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                        <Text style={styles.welcomeTitle}>{t('welcome')}</Text>
                        <Text style={styles.mainTitle}>{t(countdownTargetName)}</Text>

                        <Text style={styles.subText}>{t(countdownLabel)}</Text>

                        {/* COUNTDOWN */}
                        <View style={styles.countdownRow}>
                            <OctagonTimeUnit value={countdown.days} label={t('days.label')} />
                            <Text style={styles.colon}>:</Text>
                            <OctagonTimeUnit value={countdown.hours} label={t('hours')} />
                            <Text style={styles.colon}>:</Text>
                            <OctagonTimeUnit value={countdown.minutes} label={t('minutes')} />
                            <Text style={styles.colon}>:</Text>
                            <OctagonTimeUnit value={countdown.seconds} label={t('seconds')} />
                        </View>

                        {/* PRAYER GRID */}
                        <View style={styles.gridContainer}>
                            <View style={styles.row}>
                                <PrayerCard name={t('prayers.Imsak')} time={todayPrayers?.Imsak || '--:--'} />
                                <PrayerCard name={t('prayers.Sunrise')} time={todayPrayers?.Sunrise || '--:--'} />
                                <PrayerCard name={t('prayers.Dhuhr')} time={todayPrayers?.Dhuhr || '--:--'} />
                            </View>
                            <View style={styles.row}>
                                <PrayerCard name={t('prayers.Asr')} time={todayPrayers?.Asr || '--:--'} />
                                <PrayerCard name={t('prayers.Maghrib')} time={todayPrayers?.Maghrib || '--:--'} />
                                <PrayerCard name={t('prayers.Isha')} time={todayPrayers?.Isha || '--:--'} />
                            </View>
                        </View>

                        {/* DAILY HADITH - Sadece görüntüleme */}
                        {(() => {
                            const hadith = getDailyHadith(language);
                            return (
                                <View style={styles.hadithContainer}>
                                    <Text style={styles.hadithLabel}>{t('dailyHadith')}</Text>
                                    <Text style={styles.hadithText}>"{hadith.text}"</Text>
                                    <Text style={styles.hadithSource}>
                                        — Hz. Muhammed (s.a.v.) - {hadith.source}
                                    </Text>
                                </View>
                            );
                        })()}

                        {/* IMSAKIYE BUTTON */}
                        <TouchableOpacity onPress={() => setShowImsakiye(true)} activeOpacity={0.8} style={styles.imsakiyeTouchable}>
                            <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']} style={styles.imsakiyeBtnGradient}>
                                <Text style={styles.imsakiyeBtnText}>{t('imsakiyeBtn')}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{ height: 50 }} />
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>

            {/* Menu Modal */}
            <Modal visible={showMenu} transparent animationType="fade" onRequestClose={() => setShowMenu(false)}>
                <View style={styles.menuOverlay}>
                    <View style={[styles.menuContent, { paddingTop: insets.top + 20 }]}>
                        <View style={styles.menuHeader}>
                            <Text style={styles.menuTitle}>{t('menuTitle')}</Text>
                            <TouchableOpacity onPress={() => setShowMenu(false)}>
                                <Ionicons name="close-circle-outline" size={28} color={GOLD_COLOR} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Home')}>
                            <Ionicons name="home" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuHome')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Prayers')}>
                            <Ionicons name="book" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuPrayers')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Dhikr')}>
                            <Ionicons name="radio-button-on" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuDhikr')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Qibla')}>
                            <Ionicons name="compass" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuQibla')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Settings')}>
                            <Ionicons name="settings-outline" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuSettings')}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.menuCloseArea} onPress={() => setShowMenu(false)} />
                </View>
            </Modal>

            {/* Imsakiye Modal */}
            <Modal visible={showImsakiye} animationType="slide" transparent={true} onRequestClose={() => setShowImsakiye(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.modalTitle}>{t('imsakiyeTitle')}</Text>
                                <Text style={{ color: '#888', fontSize: 10, marginTop: 2 }}>
                                    {t(`methods.${calculationMethod}`) || t('methods.13')}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setShowImsakiye(false)}
                                style={{ padding: 8, marginLeft: 10 }}
                            >
                                <Ionicons name="close-circle" size={28} color={GOLD_COLOR} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tableHeaderRow}>
                            <Text style={[styles.th, { width: 50 }]}>{t('imsakiye.date')}</Text>
                            <Text style={[styles.th, { width: 70, color: GOLD_COLOR, backgroundColor: '#f0f0f0' }]}>HİCRİ</Text>
                            <Text style={styles.th}>{t('imsakiye.imsak')}</Text>
                            <Text style={styles.th}>{t('imsakiye.sun')}</Text>
                            <Text style={styles.th}>{t('imsakiye.dhuhr')}</Text>
                            <Text style={styles.th}>{t('imsakiye.asr')}</Text>
                            <Text style={styles.th}>{t('imsakiye.iftar')}</Text>
                            <Text style={styles.th}>{t('imsakiye.isha')}</Text>
                        </View>
                        {loadingImsakiye ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color={GOLD_COLOR} />
                                <Text style={{ marginTop: 10, fontFamily: serifFont }}>{t('loading')}</Text>
                            </View>
                        ) : (
                            <ScrollView>
                                {imsakiyeData.map((item, index) => (
                                    <View key={index} style={[styles.tr, index % 2 === 0 ? styles.trEven : styles.trOdd]}>
                                        <View style={{ width: 50, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 9, color: Colors.primary }}>{item.day}. {t('imsakiye.day')}</Text>
                                            <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#000', fontFamily: serifFont }}>{item.date}</Text>
                                            <Text style={{ fontSize: 9, color: '#888' }}>{item.dayName}</Text>
                                        </View>
                                        <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', borderLeftWidth: 0.5, borderLeftColor: '#eee', borderRightWidth: 0.5, borderRightColor: '#eee' }}>
                                            <Text style={{ fontSize: 10, fontWeight: 'bold', color: GOLD_COLOR, fontFamily: serifBold }}>{item.hijriDay} RAM</Text>
                                            <Text style={{ fontSize: 10, fontWeight: 'bold', color: GOLD_COLOR, fontFamily: serifBold }}>{item.hijriYear}</Text>
                                        </View>
                                        <Text style={styles.tdBold}>{item.imsak}</Text>
                                        <Text style={styles.td}>{item.gunes}</Text>
                                        <Text style={styles.td}>{item.ogle}</Text>
                                        <Text style={styles.td}>{item.ikindi}</Text>
                                        <Text style={styles.tdBold}>{item.iftar}</Text>
                                        <Text style={styles.td}>{item.yatsi}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>

            {/* IFTAR WARNING MODAL */}
            <Modal visible={showIftarAlert} transparent animationType="fade" onRequestClose={() => setShowIftarAlert(false)}>
                <View style={styles.alertOverlay}>
                    <View style={styles.alertContent}>
                        <Ionicons name="moon" size={60} color={GOLD_COLOR} />
                        <Text style={styles.alertTitle}>{t('alertTitle', { prayer: t('prayers.Maghrib') })}</Text>
                        <Text style={styles.alertMessage}>{t('alertBodyIftar')}</Text>

                        <TouchableOpacity style={styles.alertBtn} onPress={() => setShowIftarAlert(false)}>
                            <Text style={styles.alertBtnText}>{t('close')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <AdBanner position="bottom" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#02060C' },
    bgImage: { flex: 1 },
    gradient: { flex: 1 },
    header: { paddingHorizontal: 20, marginBottom: 5 },
    content: { alignItems: 'center', paddingHorizontal: 15 },

    // TYPOGRAPHY
    welcomeTitle: {
        fontSize: 24, color: GOLD_COLOR,
        fontFamily: serifFont, letterSpacing: 3, textAlign: 'center',
        fontWeight: '400', marginBottom: 2
    },
    mainTitle: {
        fontSize: 32, color: GOLD_COLOR,
        fontFamily: serifBold, marginBottom: 12, textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4
    },
    subText: {
        color: TEXT_GOLD, textAlign: 'center', fontSize: 11,
        letterSpacing: 1.5, marginBottom: 20, fontFamily: serifFont,
        textTransform: 'uppercase'
    },

    // Countdown
    countdownRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 25, gap: 3 },
    hexNumber: { color: TEXT_GOLD, fontSize: 20, fontFamily: serifBold, marginBottom: 0 },
    hexLabel: { color: '#ccc', fontSize: 8, fontFamily: serifFont, letterSpacing: 0.5, marginTop: -2 },
    colon: { color: GOLD_COLOR, fontSize: 20, fontFamily: serifBold, marginBottom: 8, marginHorizontal: 1 },

    // Grid
    gridContainer: { width: '100%' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    prayerCard: {
        width: '32%', borderRadius: 16,
        borderWidth: 1, borderColor: 'rgba(180, 140, 60, 0.3)',
        overflow: 'hidden',
    },
    prayerCardContent: { paddingVertical: 10, alignItems: 'center' },
    prayerName: { color: GOLD_COLOR, fontSize: 9, fontFamily: serifBold, letterSpacing: 1, textTransform: 'uppercase' },
    prayerTime: { color: '#fff', fontSize: 18, fontFamily: serifBold, marginTop: 2 },

    // Imsakiye Button
    imsakiyeTouchable: {
        marginTop: 20, width: '100%', borderRadius: 12, overflow: 'hidden',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)'
    },
    imsakiyeBtnGradient: { paddingVertical: 15, alignItems: 'center', justifyContent: 'center' },
    imsakiyeBtnText: { color: GOLD_COLOR, fontSize: 13, letterSpacing: 2.5, fontFamily: serifBold, textTransform: 'uppercase' },

    // Modal
    modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center', padding: 15 },
    modalContent: { backgroundColor: '#fff', width: '100%', height: '85%', borderRadius: 12, overflow: 'hidden', borderWidth: 2, borderColor: GOLD_COLOR },
    modalHeader: { backgroundColor: '#0a1628', padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: GOLD_COLOR },
    modalTitle: { color: GOLD_COLOR, fontSize: 16, fontFamily: serifBold, letterSpacing: 1 },
    tableHeaderRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', backgroundColor: '#f8f8f8' },
    th: { flex: 1, fontSize: 10, color: '#444', textAlign: 'center', fontFamily: serifBold },
    tr: { flexDirection: 'row', paddingVertical: 8, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    trEven: { backgroundColor: '#fff' },
    trOdd: { backgroundColor: '#fbfbfb' },
    td: { flex: 1, textAlign: 'center', fontSize: 12, color: '#444', fontFamily: serifFont },
    tdBold: { flex: 1, textAlign: 'center', fontSize: 12, color: '#000', fontFamily: serifBold },

    // Menu
    menuOverlay: { flex: 1, flexDirection: 'row' },
    menuContent: { width: '75%', backgroundColor: 'rgba(15, 25, 35, 0.98)', paddingHorizontal: 20 },
    menuCloseArea: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
    menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 15 },
    menuTitle: { fontSize: 22, color: GOLD_COLOR, fontFamily: serifBold },
    menuItem: { flexDirection: 'row', alignItems: 'center', gap: 15, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#222' },
    menuItemText: { fontSize: 16, color: '#fff', fontFamily: serifFont },

    // ALERT MODAL
    alertOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
    alertContent: { width: '85%', backgroundColor: '#0a1628', borderRadius: 20, padding: 30, alignItems: 'center', borderWidth: 2, borderColor: GOLD_COLOR },
    alertTitle: { fontSize: 26, color: GOLD_COLOR, fontFamily: serifBold, marginTop: 15, marginBottom: 10, textTransform: 'uppercase' },
    alertMessage: { color: '#ccc', textAlign: 'center', fontSize: 16, fontFamily: serifFont, marginBottom: 30, lineHeight: 24 },
    alertBtn: { backgroundColor: GOLD_COLOR, paddingVertical: 12, paddingHorizontal: 40, borderRadius: 30 },
    alertBtnText: { color: '#000', fontSize: 16, fontWeight: 'bold', fontFamily: serifFont },

    // Daily Hadith
    hadithContainer: {
        marginTop: 25,
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'rgba(20, 35, 60, 0.65)',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(197, 160, 89, 0.3)',
    },
    hadithLabel: {
        color: GOLD_COLOR,
        fontSize: 12,
        fontFamily: serifBold,
        letterSpacing: 1,
        marginBottom: 12,
        textAlign: 'center',
    },
    hadithText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: serifFont,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 12,
    },
    hadithSource: {
        color: '#999',
        fontSize: 11,
        fontFamily: serifFont,
        textAlign: 'center',
    }
});

