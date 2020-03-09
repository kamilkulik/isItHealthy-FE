import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function ImagePickerComp({ navigation }) {

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === false) {
      navigation.navigate('upload', { selectedPhoto: pickerResult })
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Select photo of food from your gallery to find out if it's healthy or not
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});