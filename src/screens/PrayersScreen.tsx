import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Modal,
    ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme';
import AdBanner from '../components/AdBanner';
import { Audio } from 'expo-av';

import { PRAYERS_FULL_DATA } from '../data/prayersData';
import { YASIN_FULL } from '../data/yasin';
import { getTranslatedPrayer } from '../data/prayerTranslations';
import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';

const serifFont = 'Cinzel_400Regular';
const serifBold = 'Cinzel_700Bold';
const GOLD_COLOR = '#C5A059';
const TEXT_BROWN = '#5D4037'; // Dark brown for titles

export default function PrayersScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { language } = useApp();
    const [selectedPrayer, setSelectedPrayer] = useState<any>(null);
    const [showMenu, setShowMenu] = useState(false);

    // Audio State
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const playPauseAudio = async (url: string) => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
        } else {
            setIsLoadingAudio(true);
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: url },
                    { shouldPlay: true }
                );
                setSound(newSound);
                setIsPlaying(true);

                newSound.setOnPlaybackStatusUpdate((status: any) => {
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        newSound.setPositionAsync(0);
                    }
                });
            } catch (error) {
                alert("Ses çalınamadı.");
            } finally {
                setIsLoadingAudio(false);
            }
        }
    };

    const closeDetail = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
        }
        setSound(null);
        setIsPlaying(false);
        setSelectedPrayer(null);
    };

    const navigateTo = (screen: string) => {
        setShowMenu(false);
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/prayers_bg.png')}
                style={styles.bgImage}
                imageStyle={{ opacity: 0.6 }} // Slightly dimmed for readability
            >
                <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                    <TouchableOpacity onPress={() => setShowMenu(true)}>
                        <Ionicons name="menu" size={32} color={GOLD_COLOR} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t('prayersTitle')}</Text>
                    <View style={{ width: 32 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    {PRAYERS_FULL_DATA.map((prayer) => (
                        <TouchableOpacity
                            key={prayer.id}
                            style={styles.prayerItem}
                            onPress={() => setSelectedPrayer(prayer)}
                        >
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.prayerItemTitle}>
                                {getTranslatedPrayer(prayer.id, language, { title: prayer.title, meaning: prayer.meaning }).title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </ImageBackground>

            {/* DETAIL MODAL - MATCHING REFERENCE */}
            <Modal visible={!!selectedPrayer} transparent animationType="slide" onRequestClose={closeDetail}>
                <View style={styles.detailOverlay}>
                    {/* Background Image (Mosque Interior - blurred effect simulated) */}
                    <ImageBackground
                        source={require('../../assets/images/masjid_bg.png')}
                        style={styles.modalBg}
                        blurRadius={10} // Blurring the background
                    >
                        <View style={[styles.detailCard, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}>

                            {/* Header in Card */}
                            <Text style={styles.cardTitle}>
                                {selectedPrayer && getTranslatedPrayer(selectedPrayer.id, language, { title: selectedPrayer.title, meaning: selectedPrayer.meaning }).title}
                            </Text>

                            {/* Deco Dots */}
                            <View style={styles.decoDots}>
                                <View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} />
                                <View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} />
                            </View>

                            {/* Audio Player Strip */}
                            <View style={styles.audioStrip}>
                                <TouchableOpacity onPress={() => selectedPrayer && playPauseAudio(selectedPrayer.audio)} style={styles.miniPlayBtn}>
                                    {isLoadingAudio ? <ActivityIndicator size="small" color="#333" /> : <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="#333" />}
                                </TouchableOpacity>
                                <Text style={styles.timerText}>0:00 / 0:51</Text>
                                <View style={styles.progressBar}><View style={styles.progressFill} /></View>
                                <Ionicons name="volume-medium" size={18} color="#333" />
                                <Ionicons name="ellipsis-vertical" size={18} color="#333" style={{ marginLeft: 10 }} />
                            </View>

                            <View style={styles.goldLine} />

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardScroll}>
                                <Text style={styles.arabicText}>{selectedPrayer?.arabic}</Text>

                                <View style={styles.readingSection}>
                                    <View style={styles.readingHeader}>
                                        <View style={styles.lineSmall} />
                                        <Text style={styles.readingLabel}>{language === 'tr' ? 'OKUNUŞU:' : 'READING:'}</Text>
                                        <View style={styles.lineSmall} />
                                    </View>
                                    <Text style={styles.latinText}>{selectedPrayer?.reading}</Text>
                                </View>

                                <View style={styles.readingSection}>
                                    <View style={styles.readingHeader}>
                                        <View style={styles.lineSmall} />
                                        <Text style={styles.readingLabel}>{language === 'tr' ? 'ANLAMI:' : 'MEANING:'}</Text>
                                        <View style={styles.lineSmall} />
                                    </View>
                                    <Text style={styles.latinText}>
                                        {selectedPrayer && getTranslatedPrayer(selectedPrayer.id, language, { title: selectedPrayer.title, meaning: selectedPrayer.meaning }).meaning}
                                    </Text>
                                </View>
                            </ScrollView>

                        </View>

                        {/* Back Button (Floating Bottom Left) */}
                        <TouchableOpacity style={styles.floatingBackBtn} onPress={closeDetail}>
                            <Ionicons name="arrow-back" size={28} color="#333" />
                        </TouchableOpacity>

                    </ImageBackground>
                </View>
            </Modal>

            {/* Menu */}
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
                            <Ionicons name="book" size={20} color={GOLD_COLOR} />
                            <Text style={[styles.menuItemText, { color: GOLD_COLOR, fontWeight: 'bold' }]}>{t('menuPrayers')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Dhikr')}>
                            <Ionicons name="radio-button-on" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuDhikr')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Qibla')}>
                            <Ionicons name="compass" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuQibla')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Holidays')}>
                            <Ionicons name="calendar" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuHolidays')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Settings')}>
                            <Ionicons name="settings" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuSettings')}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.menuCloseArea} onPress={() => setShowMenu(false)} />
                </View>
            </Modal>

            <AdBanner position="bottom" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    bgImage: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 15 },
    headerTitle: { fontSize: 24, color: GOLD_COLOR, fontFamily: serifBold },

    // List
    content: { paddingHorizontal: 20 },
    prayerItem: {
        flexDirection: 'row', alignItems: 'center',
        paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)'
    },
    bullet: { fontSize: 24, color: GOLD_COLOR, marginRight: 15 },
    prayerItemTitle: { fontSize: 18, color: '#e0e0e0', fontFamily: serifFont },

    // Modal
    detailOverlay: { flex: 1 },
    modalBg: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    detailCard: {
        width: '100%', flex: 1, backgroundColor: '#fff',
        borderRadius: 0, padding: 25,
        shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10
    },

    cardTitle: {
        fontSize: 26, color: TEXT_BROWN, fontFamily: serifBold, textAlign: 'center',
        marginBottom: 10, textTransform: 'uppercase'
    },

    // Deco Dots
    decoDots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15, gap: 15 },
    dot: { width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 10, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#E0C080' }, // Triangles

    // Audio Strip
    audioStrip: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#F2F2F2', borderRadius: 30, paddingVertical: 10, paddingHorizontal: 15,
        marginBottom: 20
    },
    miniPlayBtn: { marginRight: 10 },
    timerText: { fontSize: 10, color: '#666', marginRight: 10, fontFamily: 'System' },
    progressBar: { flex: 1, height: 4, backgroundColor: '#ccc', borderRadius: 2, marginRight: 10 },
    progressFill: { width: '30%', height: '100%', backgroundColor: '#555', borderRadius: 2 },

    goldLine: { height: 1.5, backgroundColor: '#E0C080', width: '60%', alignSelf: 'center', marginBottom: 25 },

    // Content
    cardScroll: { paddingBottom: 40 },
    arabicText: {
        fontSize: 28, fontFamily: serifFont, color: '#000', textAlign: 'center', lineHeight: 50, marginBottom: 30
    },

    readingSection: { marginTop: 10 },
    readingHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
    lineSmall: { width: 30, height: 1, backgroundColor: TEXT_BROWN, opacity: 0.3 },
    readingLabel: { fontSize: 13, color: TEXT_BROWN, fontWeight: 'bold', marginHorizontal: 10, letterSpacing: 2 },

    latinText: {
        fontSize: 16, color: '#333', textAlign: 'center', fontStyle: 'italic', fontFamily: serifFont, lineHeight: 26
    },

    floatBackBtnContainer: { position: 'absolute', bottom: 30, left: 30 },
    floatingBackBtn: {
        position: 'absolute', bottom: 40, left: 30,
        width: 50, height: 50, borderRadius: 25, backgroundColor: '#E0E0E0',
        alignItems: 'center', justifyContent: 'center',
        shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5
    },

    // Menu
    menuOverlay: { flex: 1, flexDirection: 'row' },
    menuContent: { width: '75%', backgroundColor: 'rgba(15, 25, 35, 0.98)', paddingHorizontal: 20 },
    menuCloseArea: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
    menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 15 },
    menuTitle: { fontSize: 22, color: GOLD_COLOR, fontFamily: serifBold },
    menuItem: { flexDirection: 'row', alignItems: 'center', gap: 15, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#222' },
    menuItemText: { fontSize: 16, color: '#fff', fontFamily: serifFont },
});
