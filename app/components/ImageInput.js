import { createPermissionHook } from 'expo-modules-core';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import *  as ImagePicker from 'expo-image-picker'
import Icon from '../components/Icon'
import colors from '../config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'

function ImageInput({imageUri, onChangeImage}) {
    useEffect(()=>{
        requestPermission();
    },[])

    const requestPermission = async() => {
        const {granted} =  await ImagePicker.requestCameraPermissionsAsync()
        if (!granted)
          alert('You need to enable permission to access the library')
    }

    const handlePress = () => {
        console.log('Handling press!')
        if(!imageUri) selectImage();
        else 
            Alert.alert('Delete', 'Are you sure you want to delete this image?', [
                {text: 'Yes', onPress: ()=>onChangeImage(null)},
                {text: 'No'},
            ])
    }
    const selectImage = async () => {
        try {      
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5
            });
            if (!result.cancelled) onChangeImage(result.uri)
        } catch (error) {
            console.log("Error reading image", error)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri && <MaterialCommunityIcons name='camera' color={colors.medium} size={40}/>}
                {imageUri && <Image source={{uri:imageUri}} style={styles.image}/>}
                
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      backgroundColor: colors.light,
      borderRadius: 15,
      justifyContent: 'center',
      overflow: 'hidden',
      height: 100,
      width: 100
  },
  image: {
      height: '100%',
      width: '100%',
  }
});

export default ImageInput;