import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';
import {
    kandilDays2026,
    getCountryCode,
    getHolidays,
    isTodayKandil,
} from '../data/holidays2026';

const GOLD_COLOR = '#D4AF37';
const BG_COLOR = '#0a1628';

export default function HolidaysScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { language, userCity } = useApp();
    const countryCode = getCountryCode(userCity || 'Turkey');
    const holidays = getHolidays(countryCode);

    // Bugün kandil mi kontrol et
    const { isKandil, kandil: todayKandil } = isTodayKandil();

    const getKandilCelebrationMessage = () => {
        if (!todayKandil) return '';
        const lang = language as keyof typeof todayKandil.name;
        const name = todayKandil.name[lang] || todayKandil.name.tr;
        // i18n kullanarak mesaj oluştur
        return t('kandilToday', { name });
    };

    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const months = language === 'tr'
            ? ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = language === 'tr'
            ? ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return `${date.getDate()} ${months[date.getMonth()]} - ${days[date.getDay()]}`;
    };

    const getStatus = (dateStr: string): { status: 'passed' | 'today' | 'upcoming'; daysLeft: number } => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const targetDate = new Date(dateStr);
        targetDate.setHours(0, 0, 0, 0);

        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { status: 'passed', daysLeft: diffDays };
        if (diffDays === 0) return { status: 'today', daysLeft: 0 };
        return { status: 'upcoming', daysLeft: diffDays };
    };

    const getKandilName = (kandil: typeof kandilDays2026[0]): string => {
        const lang = language as keyof typeof kandil.name;
        return kandil.name[lang] || kandil.name.tr;
    };

    const getKandilDesc = (kandil: typeof kandilDays2026[0]): string => {
        const lang = language as keyof typeof kandil.description;
        return kandil.description[lang] || kandil.description.tr;
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={GOLD_COLOR} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('holidaysTitle')}</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Location Badge */}
            <View style={styles.locationBadge}>
                <Ionicons name="location" size={16} color={GOLD_COLOR} />
                <Text style={styles.locationText}>
                    {userCity || 'Türkiye'} ({countryCode})
                </Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Kandil Celebration Banner */}
                {isKandil && todayKandil && (
                    <View style={styles.celebrationBanner}>
                        <Text style={styles.celebrationIcon}>🕌✨</Text>
                        <Text style={styles.celebrationText}>{getKandilCelebrationMessage()}</Text>
                    </View>
                )}

                {/* Kandil Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="moon" size={20} color={GOLD_COLOR} />
                        <Text style={styles.sectionTitle}>{t('kandilSection')}</Text>
                    </View>

                    {kandilDays2026.map((kandil, index) => {
                        const { status, daysLeft } = getStatus(kandil.date);

                        return (
                            <View
                                key={index}
                                style={[
                                    styles.card,
                                    status === 'today' && styles.cardToday,
                                    status === 'passed' && styles.cardPassed
                                ]}
                            >
                                <View style={styles.cardLeft}>
                                    <Text style={[styles.cardDate, status === 'passed' && styles.textPassed]}>
                                        {formatDate(kandil.date)}
                                    </Text>
                                    <Text style={[styles.cardHijri, status === 'passed' && styles.textPassed]}>
                                        {kandil.hijriDate}
                                    </Text>
                                </View>
                                <View style={styles.cardMiddle}>
                                    <Text style={[styles.cardName, status === 'passed' && styles.textPassed]}>
                                        {getKandilName(kandil)}
                                    </Text>
                                    <Text style={[styles.cardDesc, status === 'passed' && styles.textPassed]} numberOfLines={2}>
                                        {getKandilDesc(kandil)}
                                    </Text>
                                </View>
                                <View style={styles.cardRight}>
                                    {status === 'today' ? (
                                        <View style={styles.todayBadge}>
                                            <Text style={styles.todayText}>{t('today')}</Text>
                                        </View>
                                    ) : status === 'passed' ? (
                                        <Text style={styles.passedText}>{t('passed')}</Text>
                                    ) : (
                                        <Text style={styles.daysLeftText}>
                                            {daysLeft} {t('daysLeft')}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Holiday Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="calendar" size={20} color={GOLD_COLOR} />
                        <Text style={styles.sectionTitle}>{t('holidaySection')}</Text>
                    </View>

                    {holidays.map((holiday, index) => {
                            const { status, daysLeft } = getStatus(holiday.date);

                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.holidayCard,
                                        status === 'today' && styles.cardToday,
                                        status === 'passed' && styles.cardPassed
                                    ]}
                                >
                                    <View style={styles.holidayLeft}>
                                        <Text style={[styles.holidayDate, status === 'passed' && styles.textPassed]}>
                                            {formatDate(holiday.date)}
                                        </Text>
                                    </View>
                                    <View style={styles.holidayMiddle}>
                                        <Text style={[styles.holidayName, status === 'passed' && styles.textPassed]}>
                                            {holiday.localName}
                                        </Text>
                                        {holiday.name !== holiday.localName && (
                                            <Text style={[styles.holidayNameEn, status === 'passed' && styles.textPassed]}>
                                                {holiday.name}
                                            </Text>
                                        )}
                                    </View>
                                    <View style={styles.cardRight}>
                                        {status === 'today' ? (
                                            <View style={styles.todayBadge}>
                                                <Text style={styles.todayText}>{t('today')}</Text>
                                            </View>
                                        ) : status === 'passed' ? (
                                            <Text style={styles.passedText}>{t('passed')}</Text>
                                        ) : (
                                            <Text style={styles.daysLeftText}>
                                                {daysLeft} {t('daysLeft')}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(212, 175, 55, 0.2)',
    },
    backBtn: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GOLD_COLOR,
        letterSpacing: 1,
    },
    locationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
    },
    locationText: {
        color: GOLD_COLOR,
        fontSize: 12,
        marginLeft: 6,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 15,
    },
    section: {
        marginTop: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GOLD_COLOR,
        marginLeft: 8,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.2)',
    },
    cardToday: {
        backgroundColor: 'rgba(212, 175, 55, 0.15)',
        borderColor: GOLD_COLOR,
    },
    cardPassed: {
        opacity: 0.5,
        backgroundColor: 'rgba(100, 100, 100, 0.1)',
    },
    cardLeft: {
        width: 80,
    },
    cardDate: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '600',
    },
    cardHijri: {
        fontSize: 9,
        color: GOLD_COLOR,
        marginTop: 2,
    },
    cardMiddle: {
        flex: 1,
        paddingHorizontal: 10,
    },
    cardName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardDesc: {
        fontSize: 10,
        color: '#aaa',
        marginTop: 3,
    },
    cardRight: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        minWidth: 50,
    },
    todayBadge: {
        backgroundColor: GOLD_COLOR,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    todayText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    passedText: {
        fontSize: 10,
        color: '#666',
    },
    daysLeftText: {
        fontSize: 11,
        color: GOLD_COLOR,
        fontWeight: '600',
    },
    textPassed: {
        color: '#666',
    },
    holidayCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    holidayLeft: {
        width: 90,
    },
    holidayDate: {
        fontSize: 11,
        color: '#ccc',
    },
    holidayMiddle: {
        flex: 1,
        paddingHorizontal: 8,
    },
    holidayName: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '500',
    },
    holidayNameEn: {
        fontSize: 10,
        color: '#888',
        marginTop: 2,
    },
    celebrationBanner: {
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderRadius: 16,
        padding: 20,
        marginTop: 15,
        marginBottom: 5,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: GOLD_COLOR,
    },
    celebrationIcon: {
        fontSize: 32,
        marginBottom: 10,
    },
    celebrationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GOLD_COLOR,
        textAlign: 'center',
    },
});
