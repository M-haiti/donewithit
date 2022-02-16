import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import colors from '../config/colors';
import AppText from './AppText';
import { useNetInfo } from '@react-native-community/netinfo'

function OfflineNotice(props) {
    const netInfo = useNetInfo();
    if (netInfo.type != "unkown" && netInfo.isInternetReachable === false) {
        return (
            <View style={styles.container}>
                <AppText style={styles.text}>No internet connection</AppText>
            </View>
        );
    }

    return null
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        height: 50,
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        top: Constants.statusBarHeight,
    },
    text: {
        color: colors.white
    }
});

export default OfflineNotice;