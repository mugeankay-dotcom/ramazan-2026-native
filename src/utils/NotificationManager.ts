import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Check if running in Expo Go (where push notifications don't work)
const isExpoGo = Constants.appOwnership === 'expo';

// ALWAYS set notification handler - even in Expo Go for debugging
// Bu handler uygulama ön plandayken bildirimlerin nasıl gösterileceğini belirler
Notifications.setNotificationHandler({
    handleNotification: async () => {
        console.log('🔔 Notification received while app is in foreground');
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
            priority: Notifications.AndroidNotificationPriority.MAX,
        };
    },
});

export async function registerForPushNotificationsAsync() {
    console.log('🔔 Registering for notifications...');
    console.log('📱 Platform:', Platform.OS);
    console.log('📱 Is Expo Go:', isExpoGo);

    try {
        // Android için bildirim kanalı oluştur - ÇOK ÖNEMLİ
        if (Platform.OS === 'android') {
            const channel = await Notifications.setNotificationChannelAsync('prayer-channel', {
                name: 'Ezan Vakti Bildirimleri',
                description: 'Namaz vakti uyarıları',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 500, 200, 500],
                lightColor: '#D4AF37',
                sound: 'default',
                enableVibrate: true,
                enableLights: true,
                lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                bypassDnd: false, // Rahatsız etme modunu bypass etme
            });
            console.log('✅ Android notification channel created:', channel);
        }

        // İzin durumunu kontrol et
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        console.log('📋 Existing permission status:', existingStatus);

        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            console.log('📋 Requesting notification permission...');
            const { status } = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                },
                android: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                },
            });
            finalStatus = status;
            console.log('📋 New permission status:', finalStatus);
        }

        if (finalStatus !== 'granted') {
            console.log('❌ Notification permission NOT granted!');
            return false;
        }

        console.log('✅ Notification permission granted!');
        return true;
    } catch (error) {
        console.log('❌ Notification setup error:', error);
        return false;
    }
}

// Cancel all scheduled notifications
export async function cancelAllScheduledNotifications() {
    if (isExpoGo) {
        console.log('[DEV] Would cancel all scheduled notifications');
        return;
    }

    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        console.log('All scheduled notifications cancelled');
    } catch (error) {
        console.log('Cancel notifications error:', error);
    }
}

// Schedule a notification at a specific time
export async function scheduleNotificationAtTime(
    title: string,
    body: string,
    targetDate: Date,
    identifier: string,
    playSound: boolean = true
) {
    // Expo Go'da bile log at - debugging için
    if (isExpoGo) {
        console.log(`[EXPO GO] Would schedule: ${title} at ${targetDate.toLocaleTimeString()}`);
        // Expo Go'da gerçek bildirim planlanamaz ama log'layalım
    }

    try {
        const now = new Date();
        const triggerSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

        // Don't schedule if time has passed
        if (triggerSeconds <= 0) {
            console.log(`⏭️ Skipping past notification: ${title} (${identifier}) - ${Math.abs(triggerSeconds)}s ago`);
            return null;
        }

        // Bildirim planla
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                sound: playSound ? 'default' : undefined,
                data: { type: 'prayer', identifier, scheduledFor: targetDate.toISOString() },
                priority: Notifications.AndroidNotificationPriority.MAX,
                vibrate: [0, 500, 200, 500],
                color: '#D4AF37',
            },
            trigger: {
                seconds: triggerSeconds,
                channelId: 'prayer-channel',
            },
            identifier: identifier,
        });

        const hours = Math.floor(triggerSeconds / 3600);
        const mins = Math.floor((triggerSeconds % 3600) / 60);
        console.log(`✅ Scheduled: ${identifier} at ${targetDate.toLocaleTimeString()} (in ${hours}h ${mins}m) sound:${playSound}`);
        return notificationId;
    } catch (error) {
        console.log('❌ Schedule notification error:', error);
        return null;
    }
}

// Schedule all prayer notifications for today
export async function scheduleDailyPrayerNotifications(
    prayerTimes: {
        Imsak?: string;
        Fajr?: string;
        Sunrise?: string;
        Dhuhr?: string;
        Asr?: string;
        Maghrib?: string;
        Isha?: string;
    },
    translations: {
        imsak: string;
        fajr: string;
        sunrise: string;
        dhuhr: string;
        asr: string;
        maghrib: string;
        isha: string;
        alertTitle: (prayer: string) => string;
        alertBodyPrayer: string;
        alertBodyIftar: string;
        alertBodySahur: string;
    },
    isRamadan: boolean = false,  // Ramazan kontrolü
    soundEnabled: boolean = true  // Ses kontrolü
) {
    console.log('🕌 ========== SCHEDULING DAILY PRAYER NOTIFICATIONS ==========');
    console.log('🕌 Prayer times received:', JSON.stringify(prayerTimes, null, 2));
    console.log('🕌 Is Ramadan:', isRamadan);
    console.log('🕌 Sound enabled:', soundEnabled);

    // Expo Go'da gerçek bildirim çalışmaz ama log'la
    if (isExpoGo) {
        console.log('⚠️ [EXPO GO] Notifications won\'t actually work - use production build');
    }

    // Cancel existing notifications first to avoid duplicates
    await cancelAllScheduledNotifications();

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    console.log('📅 Today:', todayStr);

    const parseTime = (timeStr: string | undefined): Date | null => {
        if (!timeStr) return null;
        const [h, m] = timeStr.split(':').map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
    };

    // Prayer notifications to schedule
    // İmsak bildirimi SADECE Ramazan'da aktif (sahur için)
    // Sabah namazı (Fajr) her zaman aktif
    const prayers = [
        // İmsak - SADECE Ramazan döneminde (sahur vakti)
        ...(isRamadan ? [{
            id: 'imsak',
            time: prayerTimes.Imsak,
            name: translations.imsak,
            body: translations.alertBodySahur,
            isIftar: false,
            isSahur: true,
            enabled: true
        }] : []),
        // Sabah namazı (Fajr) - Her zaman aktif
        {
            id: 'fajr',
            time: prayerTimes.Fajr,
            name: translations.fajr,
            body: translations.alertBodyPrayer,
            isIftar: false,
            isSahur: false,
            enabled: true
        },
        {
            id: 'dhuhr',
            time: prayerTimes.Dhuhr,
            name: translations.dhuhr,
            body: translations.alertBodyPrayer,
            isIftar: false,
            isSahur: false,
            enabled: true
        },
        {
            id: 'asr',
            time: prayerTimes.Asr,
            name: translations.asr,
            body: translations.alertBodyPrayer,
            isIftar: false,
            isSahur: false,
            enabled: true
        },
        {
            id: 'maghrib',
            time: prayerTimes.Maghrib,
            name: translations.maghrib,
            body: isRamadan ? translations.alertBodyIftar : translations.alertBodyPrayer,
            isIftar: isRamadan,
            isSahur: false,
            enabled: true
        },
        {
            id: 'isha',
            time: prayerTimes.Isha,
            name: translations.isha,
            body: translations.alertBodyPrayer,
            isIftar: false,
            isSahur: false,
            enabled: true
        },
    ];

    let scheduledCount = 0;
    const scheduledPrayers: string[] = [];
    const skippedPrayers: string[] = [];

    for (const prayer of prayers) {
        const prayerTime = parseTime(prayer.time);
        if (!prayerTime) {
            console.log(`⚠️ No time for ${prayer.id}`);
            continue;
        }

        const identifier = `${todayStr}-${prayer.id}`;
        const title = translations.alertTitle(prayer.name);

        console.log(`🕐 Processing ${prayer.id}: ${prayer.time} -> ${prayerTime.toLocaleTimeString()}`);

        const result = await scheduleNotificationAtTime(
            title,
            prayer.body,
            prayerTime,
            identifier,
            soundEnabled
        );

        if (result) {
            scheduledCount++;
            scheduledPrayers.push(`${prayer.id} (${prayer.time})`);
        } else {
            skippedPrayers.push(`${prayer.id} (${prayer.time})`);
        }
    }

    console.log('🕌 ========== NOTIFICATION SCHEDULING COMPLETE ==========');
    console.log(`✅ Scheduled ${scheduledCount} notifications:`, scheduledPrayers.join(', ') || 'none');
    if (skippedPrayers.length > 0) {
        console.log(`⏭️ Skipped (past times):`, skippedPrayers.join(', '));
    }

    return scheduledCount;
}

// Legacy function - keep for compatibility
export async function schedulePrayerNotification(title: string, body: string, triggerSeconds: number) {
    if (isExpoGo) {
        console.log(`[DEV] Would schedule notification: ${title}`);
        return;
    }

    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                sound: true,
                data: { data: 'prayer' },
            },
            trigger: { seconds: triggerSeconds, channelId: 'prayer-channel' },
        });
    } catch (error) {
        console.log('Schedule notification error:', error);
    }
}

export async function sendImmediateNotification(title: string, body: string, playSound: boolean = true) {
    console.log(`🔔 Sending immediate notification: ${title}`);

    // Expo Go'da bile deneyelim - log'a düşer en azından
    if (isExpoGo) {
        console.log(`[EXPO GO] Would send: ${title} - ${body}`);
    }

    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                sound: playSound,
                data: { data: 'prayer' },
            },
            trigger: null,
        });
    } catch (error) {
        console.log('Send notification error:', error);
    }
}

// Get all scheduled notifications (for debugging)
export async function getScheduledNotifications() {
    if (isExpoGo) {
        console.log('[DEV] Would get scheduled notifications');
        return [];
    }

    try {
        const notifications = await Notifications.getAllScheduledNotificationsAsync();
        console.log('Scheduled notifications:', notifications.length);
        notifications.forEach(n => {
            console.log(`  - ${n.identifier}: ${n.content.title}`);
        });
        return notifications;
    } catch (error) {
        console.log('Get scheduled notifications error:', error);
        return [];
    }
}
