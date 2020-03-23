import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/Button';


export default function ImagePickerComp({ navigation, style, textStyle }) {

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });

    if (pickerResult.cancelled === false) {
      navigation.navigate('Upload', { selectedPhoto: pickerResult })
    }

  };
  return (
      <TouchableOpacity onPress={openImagePickerAsync}>
        <CustomButton style={style}>
          <Text style={textStyle}>Pick a photo</Text>
        </CustomButton>
      </TouchableOpacity>
  );
};