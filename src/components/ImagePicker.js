import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/Button';
import { connect } from 'react-redux';
import { setPhotoUri } from '../actions/photo';

export function ImagePickerComp({ navigation, style, textStyle, setPhotoUri }) {

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });

    if (pickerResult.cancelled === false) {
      setPhotoUri(pickerResult.uri)
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

const mapDispatchToProps = (dispatch) => ({
  setPhotoUri: (photoUri) => dispatch(setPhotoUri(photoUri))
});

export default connect(null, mapDispatchToProps)(ImagePickerComp);