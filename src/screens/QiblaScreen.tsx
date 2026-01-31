import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Linking,
    Modal,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme';
import AdBanner from '../components/AdBanner';
import { t } from '../utils/i18n';

const serifFont = Platform.select({ ios: 'Didot', android: 'serif' });

export default function QiblaScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const [showMenu, setShowMenu] = useState(false);

    const openGoogleQibla = () => {
        Linking.openURL('https://qiblafinder.withgoogle.com/');
    };

    const navigateTo = (screen: string) => {
        setShowMenu(false);
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/masjid_bg.png')}
                style={styles.bgImage}
                imageStyle={{ opacity: 0.5 }}
            >
                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                    <TouchableOpacity onPress={() => setShowMenu(true)}>
                        <Ionicons name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Ionicons name="home" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {/* Title */}
                    <Text style={styles.title}>{t('qiblaTitle')}</Text>

                    {/* Google Qibla Button */}
                    <TouchableOpacity style={styles.googleBtn} onPress={openGoogleQibla}>
                        <Text style={styles.googleBtnText}>{t('googleQiblaBtn')}</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <Text style={styles.divider}>{t('qiblaAltText')}</Text>

                    {/* Instruction */}
                    <Text style={styles.instruction}>{t('qiblaStatus')}</Text>

                    {/* Compass */}
                    <View style={styles.compassContainer}>
                        <View style={styles.compass}>
                            <Text style={styles.dirN}>N</Text>
                            <Text style={styles.dirE}>E</Text>
                            <Text style={styles.dirS}>S</Text>
                            <Text style={styles.dirW}>W</Text>
                            <Text style={styles.kaabaIcon}>🕋</Text>
                        </View>
                    </View>

                    {/* Start Button */}
                    <TouchableOpacity style={styles.startBtn}>
                        <Text style={styles.startBtnText}>{t('startCompass')}</Text>
                    </TouchableOpacity>

                    {/* Degree Display */}
                    <Text style={styles.degree}>152°</Text>

                    {/* Calibration Note */}
                    <Text style={styles.calibrationNote}>
                        {t('qiblaInstructions')}
                    </Text>
                </View>
            </ImageBackground>

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
                            <Ionicons name="compass" size={20} color={Colors.primary} />
                            <Text style={[styles.menuItemText, { color: Colors.primary, fontWeight: 'bold' }]}>{t('menuQibla')}</Text>
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
    header: { paddingHorizontal: 20 },
    content: { flex: 1, alignItems: 'center', paddingTop: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: Colors.primary, letterSpacing: 3, marginBottom: 25, fontFamily: serifFont, textTransform: 'uppercase' },
    googleBtn: { backgroundColor: 'rgba(255, 215, 0, 0.15)', borderWidth: 2, borderColor: Colors.primary, borderRadius: 12, paddingVertical: 18, paddingHorizontal: 50, marginBottom: 20 },
    googleBtnText: { color: Colors.primary, fontSize: 14, fontWeight: 'bold', textAlign: 'center', letterSpacing: 1, fontFamily: serifFont },
    divider: { color: Colors.textDim, fontSize: 12, marginVertical: 15, fontFamily: serifFont },
    instruction: { color: Colors.textDim, fontSize: 11, letterSpacing: 1, marginBottom: 20, fontFamily: serifFont, textAlign: 'center', paddingHorizontal: 20 },
    compassContainer: { marginBottom: 20 },
    compass: { width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(20, 30, 40, 0.9)', borderWidth: 2, borderColor: '#444', justifyContent: 'center', alignItems: 'center', position: 'relative' },
    dirN: { position: 'absolute', top: 10, color: '#ff4444', fontSize: 16, fontWeight: 'bold', fontFamily: serifFont },
    dirE: { position: 'absolute', right: 10, color: Colors.textDim, fontSize: 16, fontWeight: 'bold', fontFamily: serifFont },
    dirS: { position: 'absolute', bottom: 10, color: Colors.textDim, fontSize: 16, fontWeight: 'bold', fontFamily: serifFont },
    dirW: { position: 'absolute', left: 10, color: Colors.textDim, fontSize: 16, fontWeight: 'bold', fontFamily: serifFont },
    kaabaIcon: { fontSize: 40 },
    startBtn: { backgroundColor: Colors.primary, paddingVertical: 14, paddingHorizontal: 35, borderRadius: 8, marginBottom: 15 },
    startBtnText: { color: '#000', fontSize: 13, fontWeight: 'bold', letterSpacing: 1, fontFamily: serifFont, textTransform: 'uppercase' },
    degree: { color: Colors.textDim, fontSize: 14, marginBottom: 10, fontFamily: serifFont },
    calibrationNote: { color: 'rgba(255,255,255,0.4)', fontSize: 10, textAlign: 'center', letterSpacing: 1, fontFamily: serifFont, paddingHorizontal: 30 },
    // Menu
    menuOverlay: { flex: 1, flexDirection: 'row' },
    menuContent: { width: '75%', backgroundColor: 'rgba(15, 25, 35, 0.98)', paddingHorizontal: 20 },
    menuCloseArea: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
    menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    menuTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.primary, fontFamily: serifFont },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
    menuItemText: { color: '#fff', fontSize: 16, marginLeft: 15, fontFamily: serifFont },
});
