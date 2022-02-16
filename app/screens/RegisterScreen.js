import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native'
import Screen from '../components/Screen'
import * as Yup from 'yup'
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from "../components/forms"
import authApi from '../api/auth'
import usersApi from '../api/users'
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';



const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})

function RegisterScreen(props) {
    const registerApi = useApi(usersApi.register)
    const loginApi = useApi(authApi.login)
    const auth = useAuth()
    const [error, setError] = useState()

    const handleSubmit = async (userInfo) => {
        const result = await registerApi.request(userInfo);

        //console.log('result:', result)
        if (!result.ok) {
            if (result.data) {
                console.log(result.data.error)
                setError(result.data.error) //request passed but has error returned from server
            }
            else {
                //Maybe serve is offline, or probelm with connection
                setError("An unexpected error ocurred")
            }
            return;
        }

        const { data: authToken } = await loginApi.request(
            userInfo.email,
            userInfo.password
        )
        auth.login(authToken)
        console.log('login ran!')
        //
    }


    return (
        <>
            <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
            <Screen style={styles.container}>
                <Image source={require('../assets/logo-red.png')} style={styles.logo} />
                <AppForm
                    initialValues={{ name: '', email: '', password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage error={error} visible={error} />
                    <AppFormField
                        name="name"
                        placeholder="name"
                        icon='human-female'
                        autoCapitalize="none"
                    />
                    <AppFormField
                        name="email"
                        placeholder="email"
                        icon='email'
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                    />
                    <AppFormField
                        name="password"
                        placeholder="password"
                        autoCapitalize="none"
                        icon="lock"
                        textContentType="password"
                        secureTextEntry
                    />
                    <SubmitButton title="login" />
                </AppForm>
            </Screen>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    }
})

export default RegisterScreen;