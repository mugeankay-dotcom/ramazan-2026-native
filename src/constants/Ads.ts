// AdMob Configuration
// App ID is configured in app.json

// Banner Ad Unit IDs
// Format: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
// IMPORTANT: Create a new Ad Unit in AdMob console for this app

// Test IDs (use these during development)
export const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111'; // Google test banner

// Production IDs (from AdMob console)
export const BANNER_AD_UNIT_ID = __DEV__
    ? TEST_BANNER_ID
    : 'ca-app-pub-4069218897705958/5397383982'; // Ramazan 2026 Banner

// Interstitial (optional)
export const TEST_INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712';
export const INTERSTITIAL_AD_UNIT_ID = __DEV__
    ? TEST_INTERSTITIAL_ID
    : null; // Interstitial not currently used in production

// App ID (for reference - configured in app.json)
export const ADMOB_APP_ID = 'ca-app-pub-4069218897705958~2454707639';
