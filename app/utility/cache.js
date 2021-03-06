import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const prefix = 'cache';
const expiryinMinutes = 5;

const isExpired = (item) => {
    const now = dayjs()
    const storedTime = dayjs(item.timestamp)
    const isExpired = now.diff(storedTime, 'minute') > expiryinMinutes;

    return isExpired
}

const store = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now()
        }
        await AsyncStorage.setItem(prefix + key, JSON.stringify(item))
    } catch (error) {
        console.log(error)
    }
}

const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value);

        if (!item) return null

        if (isExpired(item)) {
            await AsyncStorage.removeItem(prefix + key);
            return null
        }

    } catch (error) {
        logger.log(error)
    }
}

export default {
    store,
    get
}
