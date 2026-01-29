import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Animated,
    Dimensions,
    Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../utils/i18n';

const { width, height } = Dimensions.get('window');
const GOLD_COLOR = '#D4AF37';
const BG_COLOR = '#0a1628';

interface PrayerAlertModalProps {
    visible: boolean;
    onClose: () => void;
    prayerName: string;
    prayerTime: string;
    isIftar: boolean;
    isRamadan: boolean;
}

export default function PrayerAlertModal({
    visible,
    onClose,
    prayerName,
    prayerTime,
    isIftar,
    isRamadan,
}: PrayerAlertModalProps) {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Açılış animasyonu
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            // Titreşim paterni
            Vibration.vibrate([0, 300, 100, 300, 100, 300]);
        } else {
            scaleAnim.setValue(0);
            opacityAnim.setValue(0);
        }
    }, [visible]);

    const handleClose = () => {
        // Kapanış animasyonu
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
        });
    };

    // Mesaj belirleme
    const getMessage = () => {
        if (isIftar && isRamadan) {
            return t('alertBodyIftar');
        }
        return t('alertBodyPrayer');
    };

    // İkon belirleme
    const getIcon = () => {
        if (isIftar && isRamadan) {
            return '🌙';
        }
        return '🕌';
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            opacity: opacityAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    {/* Üst dekoratif çizgi */}
                    <View style={styles.topDecoration}>
                        <View style={styles.decorLine} />
                        <Text style={styles.decorIcon}>{getIcon()}</Text>
                        <View style={styles.decorLine} />
                    </View>

                    {/* Ana içerik */}
                    <View style={styles.content}>
                        {/* Başlık */}
                        <Text style={styles.title}>
                            {t('alertTitle', { prayer: prayerName })}
                        </Text>

                        {/* Vakit saati */}
                        <View style={styles.timeContainer}>
                            <Ionicons name="time-outline" size={24} color={GOLD_COLOR} />
                            <Text style={styles.timeText}>{prayerTime}</Text>
                        </View>

                        {/* Mesaj */}
                        <Text style={styles.message}>{getMessage()}</Text>

                        {/* İftar için özel mesaj */}
                        {isIftar && isRamadan && (
                            <View style={styles.iftarExtra}>
                                <Text style={styles.iftarEmoji}>🍽️</Text>
                            </View>
                        )}
                    </View>

                    {/* Kapatma butonu */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={handleClose}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.closeButtonText}>{t('close')}</Text>
                    </TouchableOpacity>

                    {/* Alt dekoratif çizgi */}
                    <View style={styles.bottomDecoration}>
                        <View style={styles.decorLineThin} />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width * 0.85,
        maxWidth: 350,
        backgroundColor: BG_COLOR,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: GOLD_COLOR,
        overflow: 'hidden',
        shadowColor: GOLD_COLOR,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 20,
    },
    topDecoration: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    decorLine: {
        flex: 1,
        height: 2,
        backgroundColor: GOLD_COLOR,
        opacity: 0.5,
    },
    decorIcon: {
        fontSize: 40,
        marginHorizontal: 15,
    },
    content: {
        paddingHorizontal: 30,
        paddingVertical: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: GOLD_COLOR,
        textAlign: 'center',
        marginBottom: 15,
        letterSpacing: 1,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(212, 175, 55, 0.15)',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 30,
        marginBottom: 20,
    },
    timeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
        letterSpacing: 2,
    },
    message: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center',
        lineHeight: 24,
    },
    iftarExtra: {
        marginTop: 15,
    },
    iftarEmoji: {
        fontSize: 30,
    },
    closeButton: {
        backgroundColor: GOLD_COLOR,
        marginHorizontal: 30,
        marginBottom: 20,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BG_COLOR,
        letterSpacing: 2,
    },
    bottomDecoration: {
        paddingHorizontal: 40,
        paddingBottom: 15,
    },
    decorLineThin: {
        height: 1,
        backgroundColor: GOLD_COLOR,
        opacity: 0.3,
    },
});
