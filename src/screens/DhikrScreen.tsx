import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Vibration,
    Modal,
    ScrollView,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Colors } from '../theme';
import AdBanner from '../components/AdBanner';
import { t } from '../utils/i18n';

const serifFont = Platform.select({ ios: 'Didot', android: 'serif' });

export default function DhikrScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const { dhikrCount, incrementDhikr, resetDhikr, vibrationEnabled, dhikrHistory, addToHistory, language } = useApp();

    // Get translated dhikr options
    const getDhikrOptions = () => [
        { key: 'custom', label: t('dhikrOptions.custom'), target: 0 },
        { key: 'subhanallah', label: t('dhikrOptions.subhanallah'), target: 33 },
        { key: 'elhamdulillah', label: t('dhikrOptions.elhamdulillah'), target: 33 },
        { key: 'allahuekber', label: t('dhikrOptions.allahuekber'), target: 33 },
        { key: 'lailaheillallah', label: t('dhikrOptions.lailaheillallah'), target: 99 },
    ];

    const [selectedDhikrKey, setSelectedDhikrKey] = useState('custom');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    const dhikrOptions = getDhikrOptions();
    const selectedDhikr = dhikrOptions.find(d => d.key === selectedDhikrKey) || dhikrOptions[0];

    const handlePress = () => {
        if (selectedDhikr.target > 0 && dhikrCount >= selectedDhikr.target) {
            setShowCompletionModal(true);
            return;
        }

        if (vibrationEnabled) {
            Vibration.vibrate(50);
        }

        incrementDhikr();
        addToHistory(1);

        if (selectedDhikr.target > 0 && dhikrCount + 1 === selectedDhikr.target) {
            if (vibrationEnabled) {
                Vibration.vibrate([200, 100, 200, 100, 400]);
            }
            setTimeout(() => setShowCompletionModal(true), 300);
        }
    };

    const confirmReset = () => {
        resetDhikr();
        setShowResetModal(false);
        setShowCompletionModal(false);
    };

    const navigateTo = (screen: string) => {
        setShowMenu(false);
        navigation.navigate(screen);
    };

    // Get locale for date formatting
    const getLocale = () => {
        const localeMap: { [key: string]: string } = {
            tr: 'tr-TR', en: 'en-US', ar: 'ar-SA', id: 'id-ID', ur: 'ur-PK', fr: 'fr-FR', de: 'de-DE'
        };
        return localeMap[language] || 'tr-TR';
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/dhikr_bg.png')}
                style={styles.bgImage}
                imageStyle={{ opacity: 0.6 }}
            >
                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                    <TouchableOpacity onPress={() => setShowMenu(true)}>
                        <Ionicons name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('dhikrTitle')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Ionicons name="home" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {/* Dropdown Selector */}
                    <TouchableOpacity style={styles.dropdown} onPress={() => setShowDropdown(true)}>
                        <Text style={styles.dropdownText}>{selectedDhikr.label}</Text>
                        <Ionicons name="chevron-down" size={20} color="#fff" />
                    </TouchableOpacity>

                    {/* Counter Button */}
                    <TouchableOpacity
                        style={[styles.counterButton, (selectedDhikr.target > 0 && dhikrCount >= selectedDhikr.target) && styles.counterButtonComplete]}
                        onPress={handlePress}
                        activeOpacity={0.7}
                    >
                        <View style={styles.counterInner}>
                            <Text style={styles.counterNumber}>{dhikrCount}</Text>
                            <Text style={styles.counterLabel}>
                                {selectedDhikr.target > 0 ? `/ ${selectedDhikr.target}` : t('dhikrLabel')}
                            </Text>
                        </View>
                        {(selectedDhikr.target > 0 && dhikrCount >= selectedDhikr.target) && (
                            <Ionicons name="checkmark-circle" size={40} color={Colors.primary} style={{ position: 'absolute', bottom: 20 }} />
                        )}
                    </TouchableOpacity>

                    {/* Bottom Buttons */}
                    <View style={styles.bottomButtons}>
                        <TouchableOpacity style={styles.actionBtn} onPress={() => setShowResetModal(true)}>
                            <Ionicons name="trash-outline" size={28} color={Colors.primary} />
                            <Text style={styles.actionBtnText}>{t('resetBtn')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn} onPress={() => setShowHistoryModal(true)}>
                            <Ionicons name="calendar-outline" size={28} color={Colors.primary} />
                            <Text style={styles.actionBtnText}>{t('historyBtn')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

            {/* Dropdown Modal */}
            <Modal visible={showDropdown} transparent animationType="fade" onRequestClose={() => setShowDropdown(false)}>
                <TouchableOpacity style={styles.dropdownOverlay} onPress={() => setShowDropdown(false)}>
                    <View style={styles.dropdownContent}>
                        {dhikrOptions.map((option) => (
                            <TouchableOpacity
                                key={option.key}
                                style={[styles.dropdownItem, selectedDhikrKey === option.key && styles.dropdownItemActive]}
                                onPress={() => {
                                    if (selectedDhikrKey !== option.key) {
                                        resetDhikr();
                                    }
                                    setSelectedDhikrKey(option.key);
                                    setShowDropdown(false);
                                }}
                            >
                                <Text style={[styles.dropdownItemText, selectedDhikrKey === option.key && styles.dropdownItemTextActive]}>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Reset Modal */}
            <Modal visible={showResetModal} transparent animationType="fade" onRequestClose={() => setShowResetModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Ionicons name="warning" size={40} color={Colors.primary} />
                        <Text style={styles.modalTitle}>{t('confirmReset')}</Text>
                        <Text style={styles.modalMessage}>{t('confirmResetMessage')}</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalBtnConfirm} onPress={confirmReset}>
                                <Text style={styles.modalBtnTextConfirm}>{t('yes')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setShowResetModal(false)}>
                                <Text style={styles.modalBtnTextCancel}>{t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Completion Modal */}
            <Modal visible={showCompletionModal} transparent animationType="fade" onRequestClose={() => setShowCompletionModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Ionicons name="checkmark-circle" size={60} color={Colors.primary} />
                        <Text style={[styles.modalTitle, { color: Colors.primary, marginTop: 10 }]}>
                            {language === 'tr' ? 'Zikir Tamamlandı!' : 'Dhikr Complete!'}
                        </Text>
                        <Text style={styles.modalMessage}>
                            {language === 'tr'
                                ? `"${selectedDhikr.label}" hedefi olan ${selectedDhikr.target} sayısına ulaştınız. Allah kabul etsin.`
                                : `You have reached ${selectedDhikr.target} for "${selectedDhikr.label}". May Allah accept it.`
                            }
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalBtnConfirm} onPress={confirmReset}>
                                <Text style={styles.modalBtnTextConfirm}>{t('resetBtn')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalBtnCancel, { borderColor: Colors.primary }]} onPress={() => setShowCompletionModal(false)}>
                                <Text style={[styles.modalBtnTextCancel, { color: Colors.primary }]}>{t('close')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* History Modal */}
            <Modal visible={showHistoryModal} transparent animationType="slide" onRequestClose={() => setShowHistoryModal(false)}>
                <View style={styles.historyOverlay}>
                    <View style={[styles.historyContent, { paddingTop: insets.top + 20 }]}>
                        <View style={styles.historyHeader}>
                            <Text style={styles.historyTitle}>{t('historyTitle')}</Text>
                            <TouchableOpacity onPress={() => setShowHistoryModal(false)}>
                                <Ionicons name="close-circle" size={28} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                            {Object.keys(dhikrHistory).length === 0 ? (
                                <Text style={styles.historyEmpty}>{t('historyEmpty')}</Text>
                            ) : (
                                Object.entries(dhikrHistory)
                                    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                                    .map(([date, count]) => (
                                        <View key={date} style={styles.historyItem}>
                                            <Text style={styles.historyDate}>{new Date(date).toLocaleDateString(getLocale())}</Text>
                                            <Text style={styles.historyCount}>{count} {t('dhikrLabel')}</Text>
                                        </View>
                                    ))
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Menu Modal */}
            <Modal visible={showMenu} transparent animationType="fade" onRequestClose={() => setShowMenu(false)}>
                <View style={styles.menuOverlay}>
                    <View style={[styles.menuContent, { paddingTop: insets.top + 20 }]}>
                        <View style={styles.menuHeader}>
                            <Text style={styles.menuTitle}>{t('menuTitle')}</Text>
                            <TouchableOpacity onPress={() => setShowMenu(false)}>
                                <Ionicons name="close-circle-outline" size={28} color={Colors.primary} />
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
                            <Ionicons name="radio-button-on" size={20} color={Colors.primary} />
                            <Text style={[styles.menuItemText, { color: Colors.primary, fontWeight: 'bold' }]}>{t('menuDhikr')}</Text>
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
    container: { flex: 1, backgroundColor: '#0a1628' },
    bgImage: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
    title: { fontSize: 18, fontWeight: 'bold', color: Colors.primary, letterSpacing: 2, fontFamily: serifFont },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
    dropdown: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12, marginBottom: 30 },
    dropdownText: { color: '#fff', fontSize: 16, marginRight: 10, fontFamily: serifFont },
    counterButton: { width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(20, 30, 40, 0.9)', borderWidth: 3, borderColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
    counterButtonComplete: { borderColor: '#4CAF50', backgroundColor: 'rgba(76, 175, 80, 0.2)' },
    counterInner: { alignItems: 'center' },
    counterNumber: { fontSize: 60, fontWeight: 'bold', color: Colors.primary, fontFamily: serifFont },
    counterLabel: { fontSize: 16, color: Colors.textDim, fontFamily: serifFont },
    bottomButtons: { flexDirection: 'row', gap: 30 },
    actionBtn: { alignItems: 'center' },
    actionBtnText: { color: Colors.primary, fontSize: 12, marginTop: 5, fontFamily: serifFont },
    // Dropdown Modal
    dropdownOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
    dropdownContent: { backgroundColor: 'rgba(30, 40, 50, 0.98)', borderRadius: 12, padding: 10, width: '80%' },
    dropdownItem: { paddingVertical: 15, paddingHorizontal: 20, borderRadius: 8 },
    dropdownItemActive: { backgroundColor: 'rgba(212, 175, 55, 0.2)' },
    dropdownItemText: { color: '#fff', fontSize: 16, fontFamily: serifFont },
    dropdownItemTextActive: { color: Colors.primary, fontWeight: 'bold' },
    // Modal
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' },
    modalContent: { backgroundColor: 'rgba(25, 35, 45, 0.98)', borderRadius: 20, padding: 30, alignItems: 'center', width: '85%', borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 15, fontFamily: serifFont },
    modalMessage: { fontSize: 14, color: Colors.textDim, textAlign: 'center', marginTop: 10, marginBottom: 20, fontFamily: serifFont },
    modalButtons: { flexDirection: 'row', gap: 15 },
    modalBtnConfirm: { backgroundColor: Colors.primary, paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
    modalBtnTextConfirm: { color: '#000', fontWeight: 'bold', fontFamily: serifFont },
    modalBtnCancel: { borderWidth: 1, borderColor: '#555', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
    modalBtnTextCancel: { color: '#888', fontFamily: serifFont },
    // History Modal
    historyOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)' },
    historyContent: { flex: 1, backgroundColor: 'rgba(15, 25, 35, 0.98)', paddingHorizontal: 20 },
    historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    historyTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.primary, fontFamily: serifFont },
    historyEmpty: { color: Colors.textDim, textAlign: 'center', marginTop: 50, fontFamily: serifFont },
    historyItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
    historyDate: { color: '#fff', fontFamily: serifFont },
    historyCount: { color: Colors.primary, fontWeight: 'bold', fontFamily: serifFont },
    // Menu
    menuOverlay: { flex: 1, flexDirection: 'row' },
    menuContent: { width: '75%', backgroundColor: 'rgba(15, 25, 35, 0.98)', paddingHorizontal: 20 },
    menuCloseArea: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
    menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    menuTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.primary, fontFamily: serifFont },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
    menuItemText: { color: '#fff', fontSize: 16, marginLeft: 15, fontFamily: serifFont },
});
