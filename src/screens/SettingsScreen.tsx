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
import Constants from 'expo-constants';
import { useApp } from '../context/AppContext';
import { t, supportedLanguages } from '../utils/i18n';
import { Colors } from '../theme';
import AdBanner from '../components/AdBanner';

// Dinamik versiyon bilgisi
const APP_VERSION = Constants.expoConfig?.version || '1.0.0';
const BUILD_NUMBER = Constants.expoConfig?.android?.versionCode || 1;

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
        setMidnightMode,
        userCity,
        userLocation
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
    const [showAdvancedSettings, setShowAdvancedSettings] = React.useState(false);

    // Akıllı öneri sistemi - KOORDİNAT ve şehir bazlı
    const getRecommendation = () => {
        const city = userCity?.toLowerCase() || '';
        const lat = userLocation?.lat;
        const lon = userLocation?.lng;

        // ÖNCELİK 1: Koordinat bazlı kontrol (daha güvenilir)
        // Bu sayede mahalle adı (Cankurtaran) yerine koordinatlardan ülke belirlenir
        if (lat !== undefined && lon !== undefined) {
            // Türkiye: lat 36-42, lon 26-45
            if (lat >= 36 && lat <= 42 && lon >= 26 && lon <= 45) {
                return { method: '13', school: '0', region: 'turkey', note: t('recommendNote.turkey') };
            }
            // Suudi Arabistan: lat 16-32, lon 34-56
            if (lat >= 16 && lat <= 32 && lon >= 34 && lon <= 56) {
                return { method: '4', school: '0', region: 'gulf', note: t('recommendNote.gulf') };
            }
            // BAE: lat 22-26, lon 51-56
            if (lat >= 22 && lat <= 26 && lon >= 51 && lon <= 56) {
                return { method: '8', school: '0', region: 'gulf', note: t('recommendNote.gulf') };
            }
            // Mısır: lat 22-32, lon 25-35
            if (lat >= 22 && lat <= 32 && lon >= 25 && lon <= 35) {
                return { method: '5', school: '0', region: 'egypt', note: t('recommendNote.egypt') };
            }
            // Pakistan: lat 24-37, lon 61-77
            if (lat >= 24 && lat <= 37 && lon >= 61 && lon <= 77) {
                return { method: '1', school: '1', region: 'pakistan', note: t('recommendNote.pakistan') };
            }
            // Endonezya: lat -11 to 6, lon 95-141
            if (lat >= -11 && lat <= 6 && lon >= 95 && lon <= 141) {
                return { method: '20', school: '0', region: 'indonesia', note: t('recommendNote.indonesia') };
            }
            // Malezya: lat 1-7, lon 100-119
            if (lat >= 1 && lat <= 7 && lon >= 100 && lon <= 119) {
                return { method: '17', school: '0', region: 'malaysia', note: t('recommendNote.malaysia') };
            }
            // İran: lat 25-40, lon 44-64
            if (lat >= 25 && lat <= 40 && lon >= 44 && lon <= 64) {
                return { method: '7', school: '0', region: 'iran', note: t('recommendNote.iran') };
            }
            // Fransa: lat 41-51, lon -5 to 10
            if (lat >= 41 && lat <= 51 && lon >= -5 && lon <= 10) {
                return { method: '12', school: '0', region: 'france', note: t('recommendNote.france') };
            }
            // Amerika: lat 24-49, lon -125 to -66
            if (lat >= 24 && lat <= 49 && lon >= -125 && lon <= -66) {
                return { method: '2', school: '1', region: 'america', note: t('recommendNote.america') };
            }
            // Rusya (Avrupa kısmı): lat 45-70, lon 20-60
            if (lat >= 45 && lat <= 70 && lon >= 20 && lon <= 60) {
                return { method: '14', school: '1', region: 'russia', note: t('recommendNote.russia') };
            }
            // Kuzey Avrupa (yüksek enlem): lat 48-72
            if (lat >= 48 && lat <= 72 && lon >= -10 && lon <= 40) {
                return { method: '3', school: '1', region: 'europe', note: t('recommendNote.europe') };
            }
        }

        // ÖNCELİK 2: Şehir adı bazlı kontrol (fallback)
        // Türkiye şehirleri
        const turkishCities = ['istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'adana', 'konya', 'gaziantep', 'şanlıurfa', 'mersin', 'diyarbakır', 'kayseri', 'eskişehir', 'samsun', 'denizli', 'adapazarı', 'malatya', 'kahramanmaraş', 'van', 'batman', 'elazığ', 'sivas', 'manisa', 'gebze', 'tarsus', 'kocaeli', 'balıkesir', 'erzurum', 'aydın', 'trabzon', 'hatay', 'sakarya', 'kütahya', 'muğla', 'tekirdağ', 'edirne', 'aksaray', 'türkiye', 'turkey', 'marmara', 'ege', 'akdeniz', 'karadeniz', 'iç anadolu', 'doğu anadolu', 'güneydoğu'];

        // Pakistan şehirleri
        const pakistanCities = ['karachi', 'lahore', 'islamabad', 'rawalpindi', 'faisalabad', 'multan', 'peshawar', 'quetta', 'sialkot', 'gujranwala'];

        // Endonezya şehirleri
        const indonesiaCities = ['jakarta', 'surabaya', 'bandung', 'medan', 'semarang', 'makassar', 'palembang', 'tangerang', 'depok', 'bekasi'];

        // Malezya şehirleri
        const malaysiaCities = ['kuala lumpur', 'george town', 'johor bahru', 'ipoh', 'shah alam', 'petaling jaya', 'kuching', 'kota kinabalu'];

        // Körfez ülkeleri
        const gulfCities = ['dubai', 'abu dhabi', 'riyadh', 'jeddah', 'mecca', 'medina', 'doha', 'kuwait', 'manama', 'muscat', 'sharjah'];

        // Mısır şehirleri
        const egyptCities = ['cairo', 'alexandria', 'giza', 'shubra', 'port said', 'suez', 'luxor', 'aswan'];

        // İran şehirleri
        const iranCities = ['tehran', 'mashhad', 'isfahan', 'karaj', 'shiraz', 'tabriz', 'qom', 'ahvaz'];

        // Kuzey Avrupa (yüksek enlem)
        const northernEuropeCities = ['london', 'manchester', 'birmingham', 'berlin', 'hamburg', 'munich', 'köln', 'frankfurt', 'amsterdam', 'rotterdam', 'brussels', 'paris', 'lyon', 'stockholm', 'oslo', 'copenhagen', 'helsinki', 'warsaw', 'vienna', 'zurich', 'geneva'];

        // Fransa şehirleri
        const franceCities = ['paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'strasbourg', 'montpellier', 'bordeaux', 'lille'];

        // Singapur
        const singaporeCities = ['singapore'];

        // Rusya şehirleri
        const russiaCities = ['moscow', 'saint petersburg', 'kazan', 'ufa', 'nizhny novgorod', 'samara'];

        // Amerika şehirleri
        const americaCities = ['new york', 'los angeles', 'chicago', 'houston', 'phoenix', 'philadelphia', 'san antonio', 'san diego', 'dallas', 'san jose', 'detroit', 'dearborn'];

        // Öneri belirleme (şehir adı bazlı)
        if (turkishCities.some(c => city.includes(c))) {
            return { method: '13', school: '0', region: 'turkey', note: t('recommendNote.turkey') };
        }
        if (pakistanCities.some(c => city.includes(c))) {
            return { method: '1', school: '1', region: 'pakistan', note: t('recommendNote.pakistan') };
        }
        if (indonesiaCities.some(c => city.includes(c))) {
            return { method: '20', school: '0', region: 'indonesia', note: t('recommendNote.indonesia') };
        }
        if (malaysiaCities.some(c => city.includes(c))) {
            return { method: '17', school: '0', region: 'malaysia', note: t('recommendNote.malaysia') };
        }
        if (gulfCities.some(c => city.includes(c))) {
            return { method: '4', school: '0', region: 'gulf', note: t('recommendNote.gulf') };
        }
        if (egyptCities.some(c => city.includes(c))) {
            return { method: '5', school: '0', region: 'egypt', note: t('recommendNote.egypt') };
        }
        if (iranCities.some(c => city.includes(c))) {
            return { method: '7', school: '0', region: 'iran', note: t('recommendNote.iran') };
        }
        if (franceCities.some(c => city.includes(c))) {
            return { method: '12', school: '0', region: 'france', note: t('recommendNote.france') };
        }
        if (singaporeCities.some(c => city.includes(c))) {
            return { method: '11', school: '0', region: 'singapore', note: t('recommendNote.singapore') };
        }
        if (russiaCities.some(c => city.includes(c))) {
            return { method: '14', school: '1', region: 'russia', note: t('recommendNote.russia') };
        }
        if (americaCities.some(c => city.includes(c))) {
            return { method: '2', school: '1', region: 'america', note: t('recommendNote.america') };
        }
        if (northernEuropeCities.some(c => city.includes(c))) {
            return { method: '3', school: '1', region: 'europe', note: t('recommendNote.europe') };
        }

        // Varsayılan - MWL (global)
        return { method: '3', school: '1', region: 'global', note: t('recommendNote.global') };
    };

    const recommendation = getRecommendation();
    const isUsingRecommended = calculationMethod === recommendation.method;

    // Önerilen ayarları uygula
    const applyRecommendedSettings = () => {
        setCalculationMethod(recommendation.method);
        // Diyanet için school otomatik ayarlanıyor (HomeScreen'de)
        if (recommendation.method !== '13') {
            setAsrSchool(recommendation.school);
        }
    };

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
                        <Text style={styles.settingDesc}>
                            {userCity ? `📍 ${userCity}` : t('locationDefault')}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.resetBtn}
                        onPress={() => setShowLocationResetModal(true)}
                    >
                        <Text style={styles.resetBtnText}>{t('resetBtn')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Akıllı Öneri Kartı */}
                {userCity && (
                    <View style={styles.recommendationCard}>
                        <View style={styles.recommendationHeader}>
                            <Ionicons name="bulb" size={20} color={Colors.primary} />
                            <Text style={styles.recommendationTitle}>{t('recommendTitle')}</Text>
                        </View>
                        <Text style={styles.recommendationNote}>{recommendation.note}</Text>
                        {!isUsingRecommended && (
                            <TouchableOpacity style={styles.applyRecommendedBtn} onPress={applyRecommendedSettings}>
                                <Text style={styles.applyRecommendedText}>{t('applyRecommended')}</Text>
                            </TouchableOpacity>
                        )}
                        {isUsingRecommended && (
                            <View style={styles.usingRecommendedBadge}>
                                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                <Text style={styles.usingRecommendedText}>{t('usingRecommended')}</Text>
                            </View>
                        )}
                    </View>
                )}

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

                {/* Gelişmiş Ayarlar Toggle */}
                <TouchableOpacity
                    style={styles.advancedToggle}
                    onPress={() => setShowAdvancedSettings(!showAdvancedSettings)}
                >
                    <View style={styles.advancedToggleLeft}>
                        <Ionicons name="settings-outline" size={18} color="#888" />
                        <Text style={styles.advancedToggleText}>{t('advancedSettings')}</Text>
                    </View>
                    <Ionicons
                        name={showAdvancedSettings ? "chevron-up" : "chevron-down"}
                        size={18}
                        color="#888"
                    />
                </TouchableOpacity>

                {/* Gelişmiş Ayarlar - Açılır Bölüm */}
                {showAdvancedSettings && (
                    <View style={styles.advancedSection}>
                        <Text style={styles.advancedHint}>{t('advancedHint')}</Text>

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
                    </View>
                )}

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
                <Text style={styles.version}>Ramazan 2026 v{APP_VERSION} (Build {BUILD_NUMBER})</Text>
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
                                        // Ayarlar otomatik olarak AppContext üzerinden uygulanacak
                                        // HomeScreen useEffect'i calculationMethod değişikliğini dinliyor
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
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Holidays')}>
                            <Ionicons name="calendar" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>{t('menuHolidays')}</Text>
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
                                        // Ayarlar otomatik olarak AppContext üzerinden uygulanacak
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
                                        // Ayarlar otomatik olarak AppContext üzerinden uygulanacak
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
                                        // Ayarlar otomatik olarak AppContext üzerinden uygulanacak
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
    methodOptionTextActive: { color: Colors.primary, fontWeight: 'bold' },

    // Öneri Kartı
    recommendationCard: {
        backgroundColor: 'rgba(197, 160, 89, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(197, 160, 89, 0.3)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    recommendationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    recommendationTitle: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
    recommendationNote: {
        color: '#ccc',
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 12,
    },
    applyRecommendedBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyRecommendedText: {
        color: '#000',
        fontSize: 13,
        fontWeight: 'bold',
    },
    usingRecommendedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    usingRecommendedText: {
        color: '#4CAF50',
        fontSize: 13,
    },

    // Gelişmiş Ayarlar
    advancedToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    advancedToggleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    advancedToggleText: {
        color: '#888',
        fontSize: 14,
    },
    advancedSection: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    advancedHint: {
        color: '#666',
        fontSize: 11,
        fontStyle: 'italic',
        marginBottom: 12,
        textAlign: 'center',
    },
});
