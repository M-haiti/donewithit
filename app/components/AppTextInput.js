import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import defaultStyles from '../config/styles'

function AppTextInput({icon, width = "100%", ...otherProps}) {
    return (
        <View style={[styles.container, {width}]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.medium} style={styles.icon}/>}
            <TextInput 
                style={defaultStyles.text}
                placeholderTextColor = {defaultStyles.colors.medium}
                {...otherProps}
            />
        </View>  
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        paddingVertical: 15,
        marginVertical: 10
    },
    icon: {
        marginRight: 10,
        marginLeft: 10
    },
})
export default AppTextInput;