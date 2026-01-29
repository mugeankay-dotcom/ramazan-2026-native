import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { supportedLanguages } from '../utils/i18n';
import { Colors } from '../theme';

export default function LanguageModal() {
    const { showLanguageModal, setLanguage } = useApp();

    const handleSelectLanguage = (code: string) => {
        setLanguage(code);
    };

    return (
        <Modal
            visible={showLanguageModal}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.icon}>🌙</Text>
                        <Text style={styles.title}>Hoş Geldiniz</Text>
                        <Text style={styles.subtitle}>Dilinizi Seçin / Select Your Language</Text>
                    </View>

                    <View style={styles.grid}>
                        {supportedLanguages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={styles.langCard}
                                onPress={() => handleSelectLanguage(lang.code)}
                            >
                                <Text style={styles.flag}>{lang.flag}</Text>
                                <Text style={styles.name}>{lang.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'rgba(30, 30, 50, 0.95)',
        borderRadius: 24,
        padding: 30,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)',
    },
    header: {
        alignItems: 'center',
        marginBottom: 25,
    },
    icon: {
        fontSize: 48,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },
    langCard: {
        width: '45%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
    },
    flag: {
        fontSize: 32,
        marginBottom: 8,
    },
    name: {
        color: Colors.textLight,
        fontSize: 14,
        fontWeight: '500',
    },
});
