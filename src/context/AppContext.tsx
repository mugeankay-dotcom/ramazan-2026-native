import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLocale, getLocale } from '../utils/i18n';

interface AppContextType {
    language: string;
    setLanguage: (lang: string) => void;
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
    vibrationEnabled: boolean;
    setVibrationEnabled: (enabled: boolean) => void;
    showLanguageModal: boolean;
    setShowLanguageModal: (show: boolean) => void;
    dhikrCount: number;
    setDhikrCount: (count: number) => void;
    incrementDhikr: () => void;
    resetDhikr: () => void;
    dhikrHistory: { [date: string]: number };
    addToHistory: (count: number) => void;
    userLocation: { lat: number; lng: number } | null;
    setUserLocation: (loc: { lat: number; lng: number } | null) => void;
    userCity: string;
    setUserCity: (city: string) => void;
    calculationMethod: string;
    setCalculationMethod: (method: string) => void;
    asrSchool: string;
    setAsrSchool: (school: string) => void;
    highLatitudeMethod: string;
    setHighLatitudeMethod: (method: string) => void;
    midnightMode: string;
    setMidnightMode: (mode: string) => void;
    isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [language, setLanguageState] = useState('tr');
    const [soundEnabled, setSoundEnabledState] = useState(true);
    const [vibrationEnabled, setVibrationEnabledState] = useState(true);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [dhikrCount, setDhikrCountState] = useState(0);
    const [dhikrHistory, setDhikrHistoryState] = useState<{ [date: string]: number }>({});
    const [userLocation, setUserLocationState] = useState<{ lat: number; lng: number } | null>(null);
    const [userCity, setUserCityState] = useState('');
    const [calculationMethod, setCalculationMethodState] = useState('13'); // Default: Diyanet (13)
    const [asrSchool, setAsrSchoolState] = useState('1'); // Default: Hanafi (1), Shafi (0)
    const [highLatitudeMethod, setHighLatitudeMethodState] = useState('0'); // Default: Auto (0)
    const [midnightMode, setMidnightModeState] = useState('0'); // Default: Standard (0), Jafari (1)

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        try {
            const savedLang = await AsyncStorage.getItem('language');
            const savedSound = await AsyncStorage.getItem('soundEnabled');
            const savedVibration = await AsyncStorage.getItem('vibrationEnabled');
            const savedDhikr = await AsyncStorage.getItem('dhikrCount');
            const savedHistory = await AsyncStorage.getItem('dhikrHistory');
            const savedMethod = await AsyncStorage.getItem('calculationMethod');
            const savedAsrSchool = await AsyncStorage.getItem('asrSchool');
            const savedHighLatMethod = await AsyncStorage.getItem('highLatitudeMethod');
            const savedMidnightMode = await AsyncStorage.getItem('midnightMode');
            const savedCity = await AsyncStorage.getItem('userCity');

            if (savedLang) {
                setLanguageState(savedLang);
                setLocale(savedLang);
                setShowLanguageModal(false);
            } else {
                setShowLanguageModal(true);
            }

            if (savedSound !== null) setSoundEnabledState(savedSound === 'true');
            if (savedVibration !== null) setVibrationEnabledState(savedVibration === 'true');
            if (savedDhikr) setDhikrCountState(parseInt(savedDhikr, 10));
            if (savedHistory) setDhikrHistoryState(JSON.parse(savedHistory));
            if (savedMethod) setCalculationMethodState(savedMethod);
            if (savedAsrSchool) setAsrSchoolState(savedAsrSchool);
            if (savedHighLatMethod) setHighLatitudeMethodState(savedHighLatMethod);
            if (savedMidnightMode) setMidnightModeState(savedMidnightMode);
            if (savedCity) setUserCityState(savedCity);
        } catch (e) {
            console.error('Error loading preferences:', e);
            setShowLanguageModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    const setLanguage = async (lang: string) => {
        setLanguageState(lang);
        setLocale(lang);
        await AsyncStorage.setItem('language', lang);
        setShowLanguageModal(false);
    };

    const setCalculationMethod = async (method: string) => {
        setCalculationMethodState(method);
        await AsyncStorage.setItem('calculationMethod', method);
    };

    const setAsrSchool = async (school: string) => {
        setAsrSchoolState(school);
        await AsyncStorage.setItem('asrSchool', school);
    };

    const setHighLatitudeMethod = async (method: string) => {
        setHighLatitudeMethodState(method);
        await AsyncStorage.setItem('highLatitudeMethod', method);
    };

    const setMidnightMode = async (mode: string) => {
        setMidnightModeState(mode);
        await AsyncStorage.setItem('midnightMode', mode);
    };

    const setUserLocation = async (loc: { lat: number; lng: number } | null) => {
        setUserLocationState(loc);
        if (loc) {
            await AsyncStorage.setItem('userLocation', JSON.stringify(loc));
        }
    };

    const setUserCity = async (city: string) => {
        setUserCityState(city);
        await AsyncStorage.setItem('userCity', city);
    };

    const setSoundEnabled = async (enabled: boolean) => {
        setSoundEnabledState(enabled);
        await AsyncStorage.setItem('soundEnabled', String(enabled));
    };

    const setVibrationEnabled = async (enabled: boolean) => {
        setVibrationEnabledState(enabled);
        await AsyncStorage.setItem('vibrationEnabled', String(enabled));
    };

    const setDhikrCount = async (count: number) => {
        setDhikrCountState(count);
        await AsyncStorage.setItem('dhikrCount', String(count));
    };

    const incrementDhikr = () => {
        const newCount = dhikrCount + 1;
        setDhikrCount(newCount);
    };

    const addToHistory = async (count: number) => {
        const today = new Date().toISOString().split('T')[0];
        const newHistory = { ...dhikrHistory };
        newHistory[today] = (newHistory[today] || 0) + count;
        setDhikrHistoryState(newHistory);
        await AsyncStorage.setItem('dhikrHistory', JSON.stringify(newHistory));
    };

    const resetDhikr = () => {
        setDhikrCount(0);
    };

    return (
        <AppContext.Provider
            value={{
                language,
                setLanguage,
                soundEnabled,
                setSoundEnabled,
                vibrationEnabled,
                setVibrationEnabled,
                showLanguageModal,
                setShowLanguageModal,
                dhikrCount,
                setDhikrCount,
                incrementDhikr,
                resetDhikr,
                dhikrHistory,
                addToHistory,
                userLocation,
                setUserLocation,
                userCity,
                setUserCity,
                calculationMethod,
                setCalculationMethod,
                asrSchool,
                setAsrSchool,
                highLatitudeMethod,
                setHighLatitudeMethod,
                midnightMode,
                setMidnightMode,
                isLoading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};
