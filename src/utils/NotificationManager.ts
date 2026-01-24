import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Check if running in Expo Go (where push notifications don't work)
const isExpoGo = Constants.appOwnership === 'expo';

// Only set notification handler if not in Expo Go
if (!isExpoGo) {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        } as Notifications.NotificationBehavior),
    });
}

export async function registerForPushNotificationsAsync() {
    // Skip registration in Expo Go
    if (isExpoGo) {
        console.log('⚠️ Push notifications not supported in Expo Go. Build a development build to test.');
        return false;
    }

    try {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('prayer-channel', {
                name: 'Ezan Vakti',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                sound: 'default',
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log('Notification permission not granted!');
            return false;
        }
        return true;
    } catch (error) {
        console.log('Notification setup error:', error);
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
    identifier: string
) {
    if (isExpoGo) {
        console.log(`[DEV] Would schedule notification: ${title} at ${targetDate.toLocaleTimeString()}`);
        return null;
    }

    try {
        const now = new Date();
        const triggerSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

        // Don't schedule if time has passed
        if (triggerSeconds <= 0) {
            console.log(`Skipping past notification: ${title} (${identifier})`);
            return null;
        }

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                sound: true,
                data: { type: 'prayer', identifier },
            },
            trigger: {
                seconds: triggerSeconds,
                channelId: 'prayer-channel'
            },
            identifier: identifier,
        });

        console.log(`✅ Scheduled: ${identifier} at ${targetDate.toLocaleTimeString()} (${triggerSeconds}s)`);
        return notificationId;
    } catch (error) {
        console.log('Schedule notification error:', error);
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
        sunrise: string;
        dhuhr: string;
        asr: string;
        maghrib: string;
        isha: string;
        alertTitle: (prayer: string) => string;
        alertBodyPrayer: string;
        alertBodyIftar: string;
        alertBodySahur: string;
    }
) {
    if (isExpoGo) {
        console.log('[DEV] Would schedule daily prayer notifications');
        return;
    }

    // Cancel existing notifications first to avoid duplicates
    await cancelAllScheduledNotifications();

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const parseTime = (timeStr: string | undefined): Date | null => {
        if (!timeStr) return null;
        const [h, m] = timeStr.split(':').map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
    };

    // Prayer notifications to schedule
    const prayers = [
        {
            id: 'imsak',
            time: prayerTimes.Imsak,
            name: translations.imsak,
            body: translations.alertBodySahur,
            isIftar: false,
            isSahur: true
        },
        {
            id: 'dhuhr',
            time: prayerTimes.Dhuhr,
            name: translations.dhuhr,
            body: translations.alertBodyPrayer,
            isIftar: false,
            isSahur: false
        },
        {
            id: 'asr',
            time: prayerTimes.Asr,
            name: translations.asr,
            body: translations.alertBodyPrayer,
            isIftar: false,
            isSahur: false
        },
        {
            id: 'maghrib',
            time: prayerTimes.Maghrib,
            name: translations.maghrib,
            body: translations.alertBodyIftar,
            isIftar: true,
            isSahur: false
        },
        {
            id: 'isha',
            time: prayerTimes.Isha,
            name: translations.isha,
            body: translations.alertBodyPrayer,
            isIftar: false,
            isSahur: false
        },
    ];

    let scheduledCount = 0;

    for (const prayer of prayers) {
        const prayerTime = parseTime(prayer.time);
        if (!prayerTime) continue;

        const identifier = `${todayStr}-${prayer.id}`;
        const title = translations.alertTitle(prayer.name);

        const result = await scheduleNotificationAtTime(
            title,
            prayer.body,
            prayerTime,
            identifier
        );

        if (result) {
            scheduledCount++;
        }
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
    if (isExpoGo) {
        console.log(`[DEV] Would send notification: ${title} - ${body}`);
        return;
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
