import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';
import AppText from './AppText';

function ListItem({title, subTitle, image, IconComponent, onPress, renderRightActions, showChevrons}) {
    return (
    <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight 
            onPress={onPress}
            underlayColor = {colors.light}
            >
            <View style={styles.container}>
                {IconComponent}
                {image && <Image style={styles.image} source={image}/>}
                <View style={styles.detailsContainer}>
                    <AppText numberOfLines={1} style={styles.title}>{title}</AppText>
                    {subTitle && <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>}      
                </View>
                {showChevrons && <MaterialCommunityIcons size={25} style={styles.chevron} name='chevron-right'/>}
            </View>
        </TouchableHighlight>
    </Swipeable>
    );
}
const styles = StyleSheet.create({
    chevron : {
        color: colors.medium
    },
    container: {
        flexDirection: "row",
        padding: 50,
        backgroundColor: colors.white,
        alignItems: 'center'
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent:"center"
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    title: {
        fontWeight:"500"
    },
    subTitle: {
        color: colors.medium
    }
})
export default ListItem;