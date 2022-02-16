import { useEffect } from 'react';
import expoPushTokensApi from '../api/expoPushTokens';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import navigation from "../navigation/rootNavigation"

export default useNotifications = (notificationListener) => {
    useEffect(() => {
        registerForPushNotifications()

        if (notificationListener) {
            Notifications.addNotificationReceivedListener((notification) => {
                console.log(notification)
                navigation.navigate('Account');
            })
        }

    }, []);

    const registerForPushNotifications = async () => {
        try {
            //const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            const permission = await Notifications.requestPermissionsAsync();
            if (!permission.granted) {
                return;
            }
            const token = await Notifications.getExpoPushTokenAsync()
            console.log(token)
            expoPushTokensApi.register(token.data);
        } catch (error) {
            console.log('Error getting push token', error)
        }

    }
} 