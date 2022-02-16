import React from 'react';
import { View, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import colors from '../config/colors';
import AppText from './AppText';
import { Image } from 'react-native-expo-image-cache'

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl }) {
    /*Image style={{ height: 100, width: 100 }} {...{ preview }} />*/
    const preview = { uri: imageUrl };
    const uri = thumbnailUrl
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Image style={styles.image} {...{ preview, uri }} />
                <View style={styles.detailContainer}>
                    <AppText style={styles.title} numberOfLines={1}>{title} </AppText>
                    <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 20
    },
    detailContainer: {
        padding: 20,
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold"
    },
    title: {
        marginBottom: 7
    }

})
export default Card;