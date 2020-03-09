import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-elements';

export default class CameraComp extends React.Component {

  state = {
    hasPermission: false,
    type: Camera.Constants.Type.back
  };

  componentDidMount() {
    async () => {
      const {status} = await Camera.requestPermissionsAsync();
      this.setState({ hasPermission: status === 'granted'});
    };
  }

  snap = async () => {
    if (this.camera) {
      try {
        let photo = await this.camera.takePictureAsync({ quality: 0.5 })
        this.props.navigation.navigate('upload', { selectedPhoto: photo })
      } catch(err) {
        console.log(err)
      }}
  };

  render() {
    return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1 }} 
            type={this.state.type} 
            ref={ref => {
            this.camera = ref;
            }}
          >
            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
              <View style={{ flex: 0.33 }}/>
              <TouchableOpacity 
              style={{ flex: 0.33, alignSelf: 'flex-end', alignItems: 'center' }}
              onPress={this.snap}
              >
                <Icon 
                  name='camera'
                  type='material-community'
                  size={60}
                  color='#dbdbdb'
                  />
              </TouchableOpacity>
              <TouchableOpacity 
                style={{ flex: 0.33, alignSelf: 'flex-end', alignItems: 'flex-end', marginRight: 10}}
                onPress={() => {
                  this.setState(
                    this.state.type === Camera.Constants.Type.back
                    ? { type: Camera.Constants.Type.front }
                    : { type: Camera.Constants.Type.back }
                  );
                }}
                >
                <Icon 
                  name='camera-switch'
                  type='material-community'
                  size={60}
                  color='#dbdbdb'
                  />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )
    }
};