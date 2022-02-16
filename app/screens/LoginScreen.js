import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native'
import Screen from '../components/Screen'
import * as Yup from 'yup'
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from "../components/forms"
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})

function LoginScreen(props) {
    const [loginFailed, setLoginFailed] = useState(false)
    const { login } = useAuth();

    const handleSubmit = async ({ email, password }) => {
        const result = await authApi.login(email, password)

        if (!result.ok) {
            return setLoginFailed(true)
        }

        setLoginFailed(false)
        login(result.data)
    }

    return (

        <Screen style={styles.container}>
            <Image source={require('../assets/logo-red.png')} style={styles.logo} />
            <ErrorMessage error="Email and/or password is invalid." visible={loginFailed} />
            <AppForm
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
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

export default LoginScreen;