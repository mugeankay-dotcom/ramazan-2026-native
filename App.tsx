import React, { useCallback, useEffect } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Cinzel_400Regular, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

import { AppProvider } from './src/context/AppContext';

import HomeScreen from './src/screens/HomeScreen';
import DhikrScreen from './src/screens/DhikrScreen';
import PrayersScreen from './src/screens/PrayersScreen';
import QiblaScreen from './src/screens/QiblaScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HolyDaysScreen from './src/screens/HolyDaysScreen';
import LanguageModal from './src/components/LanguageModal';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob Initialized', adapterStatuses);
      });
  }, []);
  const [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <AppProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#0a1628' },
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Prayers" component={PrayersScreen} />
              <Stack.Screen name="Dhikr" component={DhikrScreen} />
              <Stack.Screen name="Qibla" component={QiblaScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="HolyDays" component={HolyDaysScreen} />
            </Stack.Navigator>
            <LanguageModal />
          </NavigationContainer>
        </AppProvider>
      </SafeAreaProvider>
    </View>
  );
}
