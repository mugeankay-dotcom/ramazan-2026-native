import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../utils/i18n';

const GOLD_COLOR = '#C5A059';
const serifFont = 'Cinzel_400Regular';
const serifBold = 'Cinzel_700Bold';

// 2026 İslami Önemli Günler (Miladi Takvim) - Diyanet Takvimi
const HOLY_DAYS_2026 = [
    { id: 'regaip', date: '2026-01-22', hijriDate: '1 Recep 1447', icon: 'moon' },
    { id: 'mirac', date: '2026-02-12', hijriDate: '22 Recep 1447', icon: 'rocket' },
    { id: 'ramadanStart', date: '2026-02-17', hijriDate: '1 Ramazan 1447', icon: 'calendar' },
    { id: 'berat', date: '2026-03-01', hijriDate: '15 Şaban 1447', icon: 'star' },
    { id: 'kadir', date: '2026-03-13', hijriDate: '27 Ramazan 1447', icon: 'sparkles' },
    { id: 'ramadanEnd', date: '2026-03-20', hijriDate: '1 Şevval 1447', icon: 'gift' },
    { id: 'arafat', date: '2026-05-26', hijriDate: '9 Zilhicce 1447', icon: 'people' },
    { id: 'kurban', date: '2026-05-27', hijriDate: '10 Zilhicce 1447', icon: 'heart' },
    { id: 'hijriNewYear', date: '2026-06-17', hijriDate: '1 Muharrem 1448', icon: 'calendar-outline' },
    { id: 'ashura', date: '2026-06-26', hijriDate: '10 Muharrem 1448', icon: 'water' },
    { id: 'mevlid', date: '2026-09-04', hijriDate: '12 Rebiülevvel 1448', icon: 'sunny' },
];

export default function HolyDaysScreen() {
    const insets = useSafeAreaInsets();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Tarihleri sırala ve hesapla
    const sortedDays = HOLY_DAYS_2026
        .map(day => {
            const eventDate = new Date(day.date + 'T00:00:00');
            const diffTime = eventDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return { ...day, eventDate, diffDays };
        })
        .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00');
        const day = date.getDate();
        const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                       'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        return `${day} ${months[date.getMonth()]} 2026`;
    };

    const getStatusText = (diffDays: number) => {
        if (diffDays === 0) return t('today');
        if (diffDays > 0) return `${diffDays} ${t('daysRemaining')}`;
        return `${Math.abs(diffDays)} ${t('daysPassed')}`;
    };

    const getStatusColor = (diffDays: number) => {
        if (diffDays === 0) return '#4CAF50';
        if (diffDays > 0 && diffDays <= 7) return '#FF9800';
        if (diffDays > 0) return GOLD_COLOR;
        return '#888';
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/masjid_bg.png')}
                style={styles.bgImage}
                imageStyle={{ opacity: 1, resizeMode: 'cover' }}
            >
                <LinearGradient
                    colors={['rgba(2, 6, 12, 0.95)', 'rgba(5, 15, 30, 0.85)', 'rgba(2, 6, 12, 0.95)']}
                    style={styles.gradient}
                >
                    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                        <Text style={styles.title}>{t('holyDaysTitle')}</Text>
                        <Text style={styles.subtitle}>{t('holyDaysSubtitle')}</Text>
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}
                    >
                        {sortedDays.map((day, index) => (
                            <View
                                key={day.id}
                                style={[
                                    styles.card,
                                    day.diffDays === 0 && styles.cardToday,
                                    day.diffDays < 0 && styles.cardPassed
                                ]}
                            >
                                <View style={styles.cardLeft}>
                                    <View style={[
                                        styles.iconContainer,
                                        { backgroundColor: day.diffDays < 0 ? 'rgba(100,100,100,0.3)' : 'rgba(197, 160, 89, 0.2)' }
                                    ]}>
                                        <Ionicons
                                            name={day.icon as any}
                                            size={24}
                                            color={day.diffDays < 0 ? '#888' : GOLD_COLOR}
                                        />
                                    </View>
                                </View>

                                <View style={styles.cardCenter}>
                                    <Text style={[
                                        styles.cardTitle,
                                        day.diffDays < 0 && styles.textPassed
                                    ]}>
                                        {t(`holyDays.${day.id}`)}
                                    </Text>
                                    <Text style={[
                                        styles.cardDate,
                                        day.diffDays < 0 && styles.textPassed
                                    ]}>
                                        {formatDate(day.date)} • {day.hijriDate}
                                    </Text>
                                    <Text style={styles.cardDesc} numberOfLines={2}>
                                        {t(`holyDayDesc.${day.id}`)}
                                    </Text>
                                </View>

                                <View style={styles.cardRight}>
                                    <Text style={[
                                        styles.statusText,
                                        { color: getStatusColor(day.diffDays) }
                                    ]}>
                                        {getStatusText(day.diffDays)}
                                    </Text>
                                </View>
                            </View>
                        ))}

                        <View style={{ height: 100 }} />
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#02060C',
    },
    bgImage: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(197, 160, 89, 0.3)',
    },
    title: {
        fontSize: 22,
        color: GOLD_COLOR,
        fontFamily: serifBold,
        textAlign: 'center',
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 12,
        color: '#888',
        fontFamily: serifFont,
        textAlign: 'center',
        marginTop: 5,
    },
    content: {
        padding: 15,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'rgba(20, 35, 55, 0.8)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(197, 160, 89, 0.2)',
    },
    cardToday: {
        borderColor: '#4CAF50',
        borderWidth: 2,
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
    },
    cardPassed: {
        opacity: 0.6,
        backgroundColor: 'rgba(50, 50, 50, 0.5)',
    },
    cardLeft: {
        marginRight: 12,
        justifyContent: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardCenter: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        color: GOLD_COLOR,
        fontFamily: serifBold,
        marginBottom: 2,
    },
    cardDate: {
        fontSize: 13,
        color: '#ccc',
        fontFamily: serifFont,
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 11,
        color: '#888',
        fontFamily: serifFont,
        lineHeight: 16,
    },
    cardRight: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        minWidth: 70,
    },
    statusText: {
        fontSize: 11,
        fontFamily: serifBold,
        textAlign: 'right',
    },
    textPassed: {
        color: '#888',
    },
});
