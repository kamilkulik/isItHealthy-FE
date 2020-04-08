import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
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
      const { status } = await Camera.getPermissionsAsync();
      this.props.setCameraAccess(status);
      
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
        const photo = await this.camera.takePictureAsync({ quality: 0.5 });
        this.props.setPhotoUri(photo.uri);
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

const mapStateToProps = (state) => ({
    permissions: state.permissions,
});

const mapDispatchToProps = (dispatch) => ({
  setCameraAccess: (boolean) => dispatch(setCameraAccess(boolean)),
  setPhotoUri: (photo) => dispatch(setPhotoUri(photo))
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraComp);