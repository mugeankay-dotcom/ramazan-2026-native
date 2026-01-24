import React, { useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { BANNER_AD_UNIT_ID } from '../constants/Ads';

/**
 * AdBanner Component
 * 
 * - In Expo Go: Displays a yellow placeholder (since native AdMob SDK cannot run there).
 * - In Production (EAS Build): Displays real AdMob Banner.
 * - Handles Safe Area to avoid overlapping with system navigation bars.
 */

interface AdBannerProps {
    position?: 'top' | 'bottom';
}

export const AdBanner: React.FC<AdBannerProps> = ({ position = 'bottom' }) => {
    const insets = useSafeAreaInsets();
    const [adLoaded, setAdLoaded] = useState(false);
    const [adError, setAdError] = useState<string | null>(null);

    // Check if running in Expo Go
    const isExpoGo = Constants.appOwnership === 'expo';

    // Use Test ID if in development build, Real ID in production
    const adUnitId = __DEV__ && !isExpoGo ? TestIds.BANNER : BANNER_AD_UNIT_ID;

    // Apply safe area padding
    const containerStyle = [
        styles.container,
        position === 'bottom' && {
            paddingBottom: Platform.OS === 'android' ? Math.max(insets.bottom, 16) : insets.bottom
        },
        position === 'top' && {
            paddingTop: Platform.OS === 'android' ? Math.max(insets.top, 10) : insets.top
        },
    ];

    if (isExpoGo) {
        return (
            <View style={containerStyle}>
                <View style={[styles.placeholder, { display: 'flex' }]}>
                    <Text style={styles.placeholderText}>📢 Reklam Alanı (Dev Mode)</Text>
                    <Text style={[styles.placeholderText, { fontSize: 10, marginTop: 4 }]}>
                        Gerçek reklamlar build sonrası görünecek
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={containerStyle}>
            <View style={styles.adWrapper}>
                {/* Show loading/error state if ad hasn't loaded */}
                {!adLoaded && (
                    <View style={styles.loadingContainer}>
                        {adError ? (
                            <Text style={styles.errorText}>⚠️ {adError}</Text>
                        ) : (
                            <Text style={styles.loadingText}>📢 Reklam yükleniyor...</Text>
                        )}
                    </View>
                )}
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    onAdLoaded={() => {
                        console.log('✅ AdMob Banner Loaded');
                        setAdLoaded(true);
                        setAdError(null);
                    }}
                    onAdFailedToLoad={(error: any) => {
                        console.error('❌ AdMob Load Error:', error.code, error.message);
                        setAdError(`Kod: ${error.code || 'Bilinmiyor'}`);
                        setAdLoaded(false);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 32, 39, 0.98)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 215, 0, 0.1)',
        overflow: 'hidden',
    },
    adWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 60,
    },
    placeholder: {
        height: 60,
        width: '100%',
        backgroundColor: 'rgba(255, 215, 0, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: 'rgba(255, 215, 0, 0.5)',
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 32, 39, 0.9)',
        zIndex: 1,
    },
    loadingText: {
        color: 'rgba(255, 215, 0, 0.4)',
        fontSize: 11,
    },
    errorText: {
        color: 'rgba(255, 100, 100, 0.6)',
        fontSize: 10,
    },
});

export default AdBanner;

