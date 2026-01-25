import React from 'react';
import { FlexWidget, TextWidget, ImageWidget } from 'react-native-android-widget';

interface PrayerTimesWidgetProps {
    nextPrayer?: string;
    nextPrayerTime?: string;
    countdown?: string;
    location?: string;
    isRamadan?: boolean;
    targetType?: 'iftar' | 'imsak' | 'prayer';
}

export function PrayerTimesWidget({
    nextPrayer = 'Yükleniyor...',
    nextPrayerTime = '--:--',
    countdown = '--:--:--',
    location = 'Konum bekleniyor',
    isRamadan = false,
    targetType = 'prayer',
}: PrayerTimesWidgetProps) {
    // Geri sayım etiketi
    const getCountdownLabel = () => {
        if (!isRamadan) return 'Ramazan\'a';
        if (targetType === 'iftar') return 'İftar\'a';
        if (targetType === 'imsak') return 'Sahur\'a';
        return `${nextPrayer}'e`;
    };

    return (
        <FlexWidget
            style={{
                height: 'match_parent',
                width: 'match_parent',
                backgroundColor: '#0f2027',
                borderRadius: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
            }}
            clickAction="OPEN_APP"
        >
            {/* Sol taraf - Namaz bilgisi */}
            <FlexWidget
                style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    flex: 1,
                }}
            >
                {/* Konum */}
                <TextWidget
                    text={`📍 ${location}`}
                    style={{
                        fontSize: 12,
                        color: '#a0a0a0',
                        marginBottom: 4,
                    }}
                />

                {/* Sonraki namaz adı */}
                <TextWidget
                    text={nextPrayer}
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginBottom: 2,
                    }}
                />

                {/* Namaz vakti */}
                <TextWidget
                    text={nextPrayerTime}
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#d4af37',
                    }}
                />
            </FlexWidget>

            {/* Sağ taraf - Geri sayım */}
            <FlexWidget
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                    borderRadius: 12,
                    padding: 12,
                    width: 130,
                }}
            >
                {/* Geri sayım etiketi */}
                <TextWidget
                    text={getCountdownLabel()}
                    style={{
                        fontSize: 11,
                        color: '#d4af37',
                        marginBottom: 4,
                    }}
                />

                {/* Geri sayım değeri */}
                <TextWidget
                    text={countdown}
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#ffffff',
                    }}
                />

                {/* Ramazan 2026 etiketi */}
                <TextWidget
                    text="🌙 Ramazan 2026"
                    style={{
                        fontSize: 10,
                        color: '#a0a0a0',
                        marginTop: 4,
                    }}
                />
            </FlexWidget>
        </FlexWidget>
    );
}
