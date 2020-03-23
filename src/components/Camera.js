import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import CrossHair from './CrossHair';
import CustomButton from './Button';
import BackArrow from './Back';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { setCameraAccess } from '../actions/permissions';
import { setPhotoUri } from '../actions/photo';

export class CameraComp extends React.Component {

  componentDidMount() {
    const checkPermissions = async () => {
      if (this.props.permissions.cameraAccess === 'undetermined' || this.props.permissions.cameraAccess === 'denied') {
        const { status } = await Camera.requestPermissionsAsync();
        this.props.setCameraAccess(status)
        console.log(status)
      }
    };
    checkPermissions()
  }

  snap = async () => {
    if (this.camera) {
      try {
        let photo = await this.camera.takePictureAsync({ quality: 0.5 })
        this.props.setPhotoUri(photo);
        this.props.navigation.navigate('Home', { 
          params: { selectedPhoto: photo},
          screen: 'Upload'
        })
      } catch(err) {
        console.log(err)
      }}
  };


  render() {
    return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1 }} 
            type={Camera.Constants.Type.back} 
            ref={ref => {
            this.camera = ref;
            }}
          >
            <View style={{ flex: 0.1, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
              <BackArrow navigation={this.props.navigation} />
            </View>
            <View style={{ flex: 0.7, backgroundColor: 'transparent', justifyContent: 'center' }}>
              <CrossHair size={350} />
            </View>
            <View style={{ flex: 0.2, alignItems: 'center' }}>
              <TouchableOpacity onPress={this.snap}>
                <CustomButton>
                  <Text style={styles.button}>Check if Healthy</Text>
                </CustomButton>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )
    }
};

const styles = StyleSheet.create({ 
  button: {
    color: Colors.white,
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '800'
  }
});

const mapStateToProps = (state) => {
  return {
    permissions: state.permissions,
    photoUri: state.photo
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCameraAccess: (boolean) => dispatch(setCameraAccess(boolean)),
  setPhotoUri: (uri) => dispatch(setPhotoUri(uri))
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraComp);