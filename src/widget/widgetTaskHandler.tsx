import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { PrayerTimesWidget } from './PrayerTimesWidget';

// Ramazan 2026 başlangıç tarihi
const RAMADAN_START = new Date('2026-02-19T00:00:00');
const RAMADAN_END = new Date('2026-03-21T00:00:00');

// Namaz adları
const PRAYER_NAMES: Record<string, string> = {
    Imsak: 'İmsak',
    Fajr: 'Sabah',
    Sunrise: 'Güneş',
    Dhuhr: 'Öğle',
    Asr: 'İkindi',
    Maghrib: 'Akşam',
    Isha: 'Yatsı',
};

interface PrayerTimes {
    Imsak?: string;
    Fajr?: string;
    Sunrise?: string;
    Dhuhr?: string;
    Asr?: string;
    Maghrib?: string;
    Isha?: string;
}

interface WidgetData {
    prayerTimes?: PrayerTimes;
    location?: string;
    lastUpdate?: string;
}

// Widget verilerini AsyncStorage'dan al
async function getWidgetData(): Promise<WidgetData> {
    try {
        const data = await AsyncStorage.getItem('widgetData');
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.log('Widget data read error:', error);
    }
    return {};
}

// Zaman string'ini Date objesine çevir
function parseTimeToDate(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
}

// Geri sayım hesapla
function calculateCountdown(targetDate: Date): string {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) return '00:00:00';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Sonraki namazı bul
function getNextPrayer(prayerTimes: PrayerTimes): { name: string; time: string; targetType: 'iftar' | 'imsak' | 'prayer' } | null {
    const now = new Date();
    const isRamadan = now >= RAMADAN_START && now < RAMADAN_END;

    // Namaz sırası
    const prayerOrder: (keyof PrayerTimes)[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    // Ramazan'daysa İmsak ve Akşam (iftar) önemli
    if (isRamadan) {
        // Sahur kontrolü (gece yarısından imsak'a kadar)
        if (prayerTimes.Imsak) {
            const imsakTime = parseTimeToDate(prayerTimes.Imsak);
            if (now < imsakTime) {
                return {
                    name: 'Sahur',
                    time: prayerTimes.Imsak,
                    targetType: 'imsak',
                };
            }
        }

        // İftar kontrolü (öğleden akşama kadar)
        if (prayerTimes.Maghrib) {
            const maghribTime = parseTimeToDate(prayerTimes.Maghrib);
            if (now < maghribTime) {
                return {
                    name: 'İftar',
                    time: prayerTimes.Maghrib,
                    targetType: 'iftar',
                };
            }
        }
    }

    // Normal namaz vakitlerini kontrol et
    for (const prayer of prayerOrder) {
        const timeStr = prayerTimes[prayer];
        if (timeStr) {
            const prayerTime = parseTimeToDate(timeStr);
            if (now < prayerTime) {
                return {
                    name: PRAYER_NAMES[prayer] || prayer,
                    time: timeStr,
                    targetType: 'prayer',
                };
            }
        }
    }

    // Tüm vakitler geçtiyse yarının sabah namazı
    if (prayerTimes.Fajr) {
        return {
            name: 'Sabah (yarın)',
            time: prayerTimes.Fajr,
            targetType: 'prayer',
        };
    }

    return null;
}

// Widget'ı render et
async function renderWidget(): Promise<React.ReactElement> {
    const now = new Date();
    const isRamadan = now >= RAMADAN_START && now < RAMADAN_END;
    const isBeforeRamadan = now < RAMADAN_START;

    const widgetData = await getWidgetData();
    const { prayerTimes, location } = widgetData;

    // Ramazan başlamadıysa
    if (isBeforeRamadan) {
        const countdown = calculateCountdown(RAMADAN_START);
        const days = Math.ceil((RAMADAN_START.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        return (
            <PrayerTimesWidget
                nextPrayer="Ramazan 2026"
                nextPrayerTime={`${days} gün`}
                countdown={countdown}
                location={location || 'Konum bekleniyor'}
                isRamadan={false}
            />
        );
    }

    // Namaz vakitleri varsa
    if (prayerTimes) {
        const nextPrayer = getNextPrayer(prayerTimes);

        if (nextPrayer) {
            const targetTime = parseTimeToDate(nextPrayer.time);
            // Eğer vakit geçtiyse yarına ayarla
            if (targetTime < now) {
                targetTime.setDate(targetTime.getDate() + 1);
            }
            const countdown = calculateCountdown(targetTime);

            return (
                <PrayerTimesWidget
                    nextPrayer={nextPrayer.name}
                    nextPrayerTime={nextPrayer.time}
                    countdown={countdown}
                    location={location || 'Konum bekleniyor'}
                    isRamadan={isRamadan}
                    targetType={nextPrayer.targetType}
                />
            );
        }
    }

    // Varsayılan görünüm
    return (
        <PrayerTimesWidget
            nextPrayer="Yükleniyor..."
            nextPrayerTime="--:--"
            countdown="--:--:--"
            location={location || 'Uygulamayı açın'}
            isRamadan={isRamadan}
        />
    );
}

// Widget adından komponente eşleştirme
const nameToWidget = {
    PrayerTimesWidget: PrayerTimesWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
    const widgetInfo = props.widgetInfo;

    switch (props.widgetAction) {
        case 'WIDGET_ADDED':
        case 'WIDGET_UPDATE':
        case 'WIDGET_RESIZED':
            const widget = await renderWidget();
            props.renderWidget(widget);
            break;

        case 'WIDGET_CLICK':
            // Widget'a tıklandığında uygulama açılır (clickAction="OPEN_APP")
            break;

        case 'WIDGET_DELETED':
            // Widget silindi
            break;

        default:
            break;
    }
}
