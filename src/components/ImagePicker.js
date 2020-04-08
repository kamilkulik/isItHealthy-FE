import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/Button';
import { connect } from 'react-redux';
import { setPhotoUri } from '../actions/photo';
import { setPhotosAccess } from '../actions/permissions'

export function ImagePickerComp({ navigation, style, textStyle, setPhotoUri, permissions, setPhotosAccess }) {

  let openImagePickerAsync = async () => {
    const { status } = await ImagePicker.getCameraRollPermissionsAsync();
    setPhotosAccess(status);

    if (permissions.photosAccess === 'undetermined' || permissions.photosAccess === 'denied') {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
      setPhotosAccess(permissionResult.status)
  
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });

    if (pickerResult.cancelled === false) {
      setPhotoUri(pickerResult.uri);
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

const mapStateToProps = (state) => ({
  permissions: state.permissions,
});

const mapDispatchToProps = (dispatch) => ({
  setPhotosAccess: (boolean) => dispatch(setPhotosAccess(boolean)),
  setPhotoUri: (photoUri) => dispatch(setPhotoUri(photoUri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePickerComp);