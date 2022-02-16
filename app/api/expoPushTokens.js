import client from './client'

const register = (pushToken) => {
    console.log('registering for notifications')
    client.post('/expoPushTokens', { token: pushToken })
}

export default {
    register,
}