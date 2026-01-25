import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { t, supportedLanguages } from '../utils/i18n';
import { Colors } from '../theme';
import AdBanner from '../components/AdBanner';

export default function SettingsScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const {
        language,
        setLanguage,
        soundEnabled,
        setSoundEnabled,
        vibrationEnabled,
        setVibrationEnabled,
        calculationMethod,
        setCalculationMethod,
        asrSchool,
        setAsrSchool,
        highLatitudeMethod,
        setHighLatitudeMethod,
        midnightMode,
        setMidnightMode
    } = useApp();

    const currentLangName = supportedLanguages.find(l => l.code === language)?.name || 'Türkçe';

    const CALCULATION_METHODS = [
        { id: '13', label: t('methods.13'), region: 'turkey' },
        { id: '3', label: t('methods.3'), region: 'global' },
        { id: '2', label: t('methods.2'), region: 'america' },
        { id: '5', label: t('methods.5'), region: 'africa' },
        { id: '4', label: t('methods.4'), region: 'gulf' },
        { id: '1', label: t('methods.1'), region: 'pakistan' },
        { id: '7', label: t('methods.7'), region: 'iran' },
        { id: '8', label: t('methods.8'), region: 'gulf' },
        { id: '9', label: t('methods.9'), region: 'gulf' },
        { id: '10', label: t('methods.10'), region: 'gulf' },
        { id: '11', label: t('methods.11'), region: 'asia' },
        { id: '12', label: t('methods.12'), region: 'europe' },
        { id: '14', label: t('methods.14'), region: 'europe' },
        { id: '17', label: t('methods.17'), region: 'asia' },
        { id: '20', label: t('methods.20'), region: 'asia' },
        { id: '0', label: t('methods.0'), region: 'shia' }
    ];

    const currentMethodLabel = CALCULATION_METHODS.find(m => m.id === calculationMethod)?.label || t('methods.13');

    // Asr Okulu (Hanefi/Şafi)
    const ASR_SCHOOLS = [
        { id: '1', label: t('schools.hanafi') },
        { id: '0', label: t('schools.shafi') }
    ];
    const currentAsrSchoolLabel = ASR_SCHOOLS.find(s => s.id === asrSchool)?.label || t('schools.hanafi');

    // Yüksek Enlem Metodu
    const HIGH_LAT_METHODS = [
        { id: '0', label: t('highLat.auto') },
        { id: '1', label: t('highLat.middleNight') },
        { id: '2', label: t('highLat.oneSeventh') },
        { id: '3', label: t('highLat.angleBased') }
    ];
    const currentHighLatLabel = HIGH_LAT_METHODS.find(m => m.id === highLatitudeMethod)?.label || t('highLat.auto');

    // Midnight Modu
    const MIDNIGHT_MODES = [
        { id: '0', label: t('midnight.standard') },
        { id: '1', label: t('midnight.jafari') }
    ];
    const currentMidnightLabel = MIDNIGHT_MODES.find(m => m.id === midnightMode)?.label || t('midnight.standard');

    const [showLocationResetModal, setShowLocationResetModal] = React.useState(false);
    const [showMethodModal, setShowMethodModal] = React.useState(false);
    const [showAsrSchoolModal, setShowAsrSchoolModal] = React.useState(false);
    const [showHighLatModal, setShowHighLatModal] = React.useState(false);
    const [showMidnightModal, setShowMidnightModal] = React.useState(false);
    const [showMenu, setShowMenu] = React.useState(false);

    const handleResetLocation = async () => {
        try {
            // Import AsyncStorage locally or use a helper
            const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            await AsyncStorage.removeItem('userLocation');
            await AsyncStorage.removeItem('userCity');

            // Navigate to Home to re-trigger location check
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (e) {
            console.error(e);
        }
    };

    const navigateTo = (screen: string) => {
        setShowMenu(false);
        navigation.navigate(screen);
    };

    return (
        <LinearGradient
            colors={[Colors.background, Colors.backgroundMid, Colors.backgroundEnd]}
            style={styles.container}
        >
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => setShowMenu(true)}>
                    <Ionicons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settingsTitle')}</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={[styles.content]}>

                {/* Location Settings */}
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>{t('locationFound')}</Text>
                        <Text style={styles.settingDesc}>{t('locationDefault')}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.resetBtn}
                        onPress={() => setShowLocationResetModal(true)}
                    >
                        <Text style={styles.resetBtnText}>{t('resetBtn')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Calculation Method Selector */}
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>{t('calcMethodLabel')}</Text>
                        <Text style={styles.settingDesc}>{t('calcMethodDesc')}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.methodSelector}
                        onPress={() => setShowMethodModal(true)}
                    >
                        <Text style={styles.methodText} numberOfLines={1}>{currentMethodLabel}</Text>
                        <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Asr School Selector (Hanefi/Şafi) */}
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>{t('asrSchoolLabel')}</Text>
                        <Text style={styles.settingDesc}>{t('asrSchoolDesc')}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.methodSelector}
                        onPress={() => setShowAsrSchoolModal(true)}
                    >
                        <Text style={styles.methodText} numberOfLines={1}>{currentAsrSchoolLabel}</Text>
                        <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* High Latitude Method Selector */}
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>{t('highLatLabel')}</Text>
                        <Text style={styles.settingDesc}>{t('highLatDesc')}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.methodSelector}
                        onPress={() => setShowHighLatModal(true)}
                    >
                        <Text style={styles.methodText} numberOfLines={1}>{currentHighLatLabel}</Text>
                        <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Midnight Mode Selector */}
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>{t('midnightLabel')}</Text>
                        <Text style={styles.settingDesc}>{t('midnightDesc')}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.methodSelector}
                        onPress={() => setShowMidnightModal(true)}
                    >
                        <Text style={styles.methodText} numberOfLines={1}>{currentMidnightLabel}</Text>
                        <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Sound Toggle */}
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>{t('soundLabel')}</Text>
                        <Text style={styles.settingDesc}>{t('soundDesc')}</Text>
                    </View>
                    <Switch
                        value={soundEnabled}
                        onValueChange={setSoundEnabled}
                        trackColor={{ false: '#555', true: Colors.primary }}
                        thumbColor="#fff"
                    />
                </View>


                {/* Vibration Toggle */}
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>{t('vibrationLabel')}</Text>
                        <Text style={styles.settingDesc}>{t('vibrationDesc')}</Text>
                    </View>
                    <Switch
                        value={vibrationEnabled}
                        onValueChange={setVibrationEnabled}
                        trackColor={{ false: '#555', true: Colors.primary }}
                        thumbColor="#fff"
                    />
                </View>

                {/* Language Selector */}
                <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>{t('languageLabel')}</Text>
                        <Text style={styles.settingDesc}>{t('languageDesc')}</Text>
                    </View>
                    <TouchableOpacity style={styles.langSelector}>
                        <Text style={styles.langText}>{currentLangName}</Text>
                    </TouchableOpacity>
                </View>

                {/* Language Grid */}
                <View style={styles.langGrid}>
                    {supportedLanguages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={[
                                styles.langCard,
                                language === lang.code && styles.langCardActive,
                            ]}
                            onPress={() => setLanguage(lang.code)}
                        >
                            <Text style={styles.langFlag}>{lang.flag}</Text>
                            <Text style={[
                                styles.langName,
                                language === lang.code && styles.langNameActive,
                            ]}>
                                {lang.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Version */}
                <Text style={styles.version}>Ramazan 2026 v1.3.2 (Build 19)</Text>
            </ScrollView>

            {/* Calculation Method Modal */}
            <Modal visible={showMethodModal} transparent animationType="fade" onRequestClose={() => setShowMethodModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('calcMethodLabel')}</Text>
                        <ScrollView style={{ maxHeight: 300, width: '100%' }}>
                            {CALCULATION_METHODS.map((method) => (
                                <TouchableOpacity
                                    key={method.id}
                                    style={[
                                        styles.methodOption,
                                        calculationMethod === method.id && styles.methodOptionActive
                                    ]}
                                    onPress={() => {
                                        setCalculationMethod(method.id);
                                        setShowMethodModal(false);
                                        // Optional: Trigger a reload or notify user that changes will apply on next refresh
                                        handleResetLocation(); // Force reload to apply new timings immediately
                                    }}
                                >
                                    <Text style={[
                                        styles.methodOptionText,
                                        calculationMethod === method.id && styles.methodOptionTextActive
                                    ]}>
                                        {method.label}
                                    </Text>
                                    {calculationMethod === method.id && (
                                        <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setShowMethodModal(false)}>
                            <Text style={styles.modalBtnTextCancel}>{t('cancel')}</Text>
                        </TouchableOpacity>
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
                            <Ionicons name="radio-button-on" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuDhikr')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Qibla')}>
                            <Ionicons name="compass" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuQibla')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Settings')}>
                            <Ionicons name="settings" size={20} color={Colors.primary} />
                            <Text style={[styles.menuItemText, { color: Colors.primary, fontWeight: 'bold' }]}>{t('menuSettings')}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.menuCloseArea} onPress={() => setShowMenu(false)} />
                </View>
            </Modal>

            {/* Location Reset Modal */}
            <Modal visible={showLocationResetModal} transparent animationType="fade" onRequestClose={() => setShowLocationResetModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Ionicons name="location" size={40} color={Colors.primary} />
                        <Text style={styles.modalTitle}>{t('confirmReset')}</Text>
                        <Text style={styles.modalMessage}>{t('confirmResetMessage')}</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalBtnConfirm} onPress={handleResetLocation}>
                                <Text style={styles.modalBtnTextConfirm}>{t('yes')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setShowLocationResetModal(false)}>
                                <Text style={styles.modalBtnTextCancel}>{t('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Asr School Modal */}
            <Modal visible={showAsrSchoolModal} transparent animationType="fade" onRequestClose={() => setShowAsrSchoolModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('asrSchoolLabel')}</Text>
                        <ScrollView style={{ maxHeight: 300, width: '100%' }}>
                            {ASR_SCHOOLS.map((school) => (
                                <TouchableOpacity
                                    key={school.id}
                                    style={[
                                        styles.methodOption,
                                        asrSchool === school.id && styles.methodOptionActive
                                    ]}
                                    onPress={() => {
                                        setAsrSchool(school.id);
                                        setShowAsrSchoolModal(false);
                                        handleResetLocation();
                                    }}
                                >
                                    <Text style={[
                                        styles.methodOptionText,
                                        asrSchool === school.id && styles.methodOptionTextActive
                                    ]}>
                                        {school.label}
                                    </Text>
                                    {asrSchool === school.id && (
                                        <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setShowAsrSchoolModal(false)}>
                            <Text style={styles.modalBtnTextCancel}>{t('cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* High Latitude Method Modal */}
            <Modal visible={showHighLatModal} transparent animationType="fade" onRequestClose={() => setShowHighLatModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('highLatLabel')}</Text>
                        <ScrollView style={{ maxHeight: 300, width: '100%' }}>
                            {HIGH_LAT_METHODS.map((method) => (
                                <TouchableOpacity
                                    key={method.id}
                                    style={[
                                        styles.methodOption,
                                        highLatitudeMethod === method.id && styles.methodOptionActive
                                    ]}
                                    onPress={() => {
                                        setHighLatitudeMethod(method.id);
                                        setShowHighLatModal(false);
                                        handleResetLocation();
                                    }}
                                >
                                    <Text style={[
                                        styles.methodOptionText,
                                        highLatitudeMethod === method.id && styles.methodOptionTextActive
                                    ]}>
                                        {method.label}
                                    </Text>
                                    {highLatitudeMethod === method.id && (
                                        <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setShowHighLatModal(false)}>
                            <Text style={styles.modalBtnTextCancel}>{t('cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Midnight Mode Modal */}
            <Modal visible={showMidnightModal} transparent animationType="fade" onRequestClose={() => setShowMidnightModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('midnightLabel')}</Text>
                        <ScrollView style={{ maxHeight: 300, width: '100%' }}>
                            {MIDNIGHT_MODES.map((mode) => (
                                <TouchableOpacity
                                    key={mode.id}
                                    style={[
                                        styles.methodOption,
                                        midnightMode === mode.id && styles.methodOptionActive
                                    ]}
                                    onPress={() => {
                                        setMidnightMode(mode.id);
                                        setShowMidnightModal(false);
                                        handleResetLocation();
                                    }}
                                >
                                    <Text style={[
                                        styles.methodOptionText,
                                        midnightMode === mode.id && styles.methodOptionTextActive
                                    ]}>
                                        {mode.label}
                                    </Text>
                                    {midnightMode === mode.id && (
                                        <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setShowMidnightModal(false)}>
                            <Text style={styles.modalBtnTextCancel}>{t('cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <AdBanner position="bottom" />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.primary, letterSpacing: 1 },
    content: { paddingHorizontal: 20, paddingBottom: 100 },

    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    settingInfo: { flex: 1 },
    settingLabel: { color: Colors.textLight, fontSize: 16, marginBottom: 4 },
    settingDesc: { color: '#888', fontSize: 12 },

    resetBtn: { backgroundColor: 'rgba(255,50,50,0.2)', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 6, borderWidth: 1, borderColor: '#ff4444' },
    resetBtnText: { color: '#ff4444', fontSize: 12, fontWeight: 'bold' },

    langSelector: {
        backgroundColor: '#222',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#555',
    },
    langText: { color: Colors.primary, fontSize: 14 },
    langGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 20 },
    langCard: {
        width: '30%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    langCardActive: { backgroundColor: 'rgba(255, 215, 0, 0.15)', borderColor: Colors.primary },
    langFlag: { fontSize: 28, marginBottom: 6 },
    langName: { color: Colors.textDim, fontSize: 11 },
    langNameActive: { color: Colors.primary, fontWeight: 'bold' },
    version: { textAlign: 'center', color: '#666', fontSize: 12, marginTop: 40 },

    // Menu Utils (Copied from other screens)
    menuOverlay: { flex: 1, flexDirection: 'row' },
    menuContent: { width: '75%', backgroundColor: 'rgba(15, 25, 35, 0.98)', paddingHorizontal: 20 },
    menuCloseArea: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
    menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 15 },
    menuTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.primary },
    menuItem: { flexDirection: 'row', alignItems: 'center', gap: 15, paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#222' },
    menuItemText: { fontSize: 16, color: '#fff' },

    // Modal Utils
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#1a2a3a', borderRadius: 16, padding: 30, alignItems: 'center', width: '85%', borderWidth: 1, borderColor: Colors.primary },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.primary, marginTop: 15, marginBottom: 10 },
    modalMessage: { color: Colors.textDim, textAlign: 'center', marginBottom: 25 },
    modalButtons: { flexDirection: 'row', gap: 15 },
    modalBtnConfirm: { backgroundColor: Colors.primary, paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
    modalBtnCancel: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#555', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
    modalBtnTextConfirm: { color: '#000', fontWeight: 'bold' },
    modalBtnTextCancel: { color: '#aaa' },

    methodSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#555',
        maxWidth: '50%'
    },
    methodText: { color: Colors.primary, fontSize: 12, marginRight: 5, flex: 1, textAlign: 'right' },
    methodOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        width: '100%'
    },
    methodOptionActive: { backgroundColor: 'rgba(197, 160, 89, 0.1)' },
    methodOptionText: { color: '#ccc', fontSize: 14 },
    methodOptionTextActive: { color: Colors.primary, fontWeight: 'bold' }
});
