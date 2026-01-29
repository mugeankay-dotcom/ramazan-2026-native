import type { ConfigContext, ExpoConfig } from 'expo/config';
import type { WithAndroidWidgetsParams } from 'react-native-android-widget';

const widgetConfig: WithAndroidWidgetsParams = {
    widgets: [
        {
            name: 'PrayerTimesWidget',
            label: 'Ramazan 2026',
            minWidth: '320dp',
            minHeight: '120dp',
            targetCellWidth: 4,
            targetCellHeight: 2,
            description: 'Namaz vakitleri ve geri sayım',
            previewImage: './assets/widget-preview.png',
            updatePeriodMillis: 1800000, // 30 dakika
        },
    ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'Ramazan 2026',
    slug: 'ramazan2026',
    version: '1.7.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
        image: './assets/icon.png',
        resizeMode: 'contain',
        backgroundColor: '#0f2027',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.ramazan.vakti',
        infoPlist: {
            NSUserTrackingUsageDescription:
                'This identifier will be used to deliver personalized ads to you.',
        },
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#0f2027',
        },
        package: 'com.ramazan.vakti',
        versionCode: 20,
        permissions: [
            'android.permission.INTERNET',
            'android.permission.ACCESS_NETWORK_STATE',
            'android.permission.ACCESS_FINE_LOCATION',
            'android.permission.ACCESS_COARSE_LOCATION',
            'android.permission.VIBRATE',
            'android.permission.RECEIVE_BOOT_COMPLETED',
            'android.permission.SCHEDULE_EXACT_ALARM',
        ],
    },
    web: {
        favicon: './assets/icon.png',
    },
    plugins: [
        [
            'expo-location',
            {
                locationAlwaysAndWhenInUsePermission:
                    'Allow $(PRODUCT_NAME) to use your location for Qibla direction and prayer times.',
            },
        ],
        [
            'react-native-google-mobile-ads',
            {
                androidAppId: 'ca-app-pub-4069218897705958~2454707639',
                iosAppId: 'ca-app-pub-4069218897705958~2454707639',
            },
        ],
        'expo-font',
        'expo-localization',
        'expo-asset',
        ['react-native-android-widget', widgetConfig],
    ],
    extra: {
        eas: {
            projectId: 'cb108693-70ce-4a28-8529-167e362852e4',
        },
    },
    owner: 'ankaymuge',
});
