import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { setCameraAccess, setPhotosAccess } from '../actions/permissions';

const Card = (props) => {
  const changeAccess = () => {
    let permission;

    props.reduxAction === setCameraAccess 
    ? permission = props.permissions.cameraAccess
    : permission = props.permissions.photosAccess

    if (props.reduxAction === setCameraAccess) {
      permission === 'granted' ? props.setCameraAccess('denied') : props.setCameraAccess('granted')
    } else if (props.reduxAction === setPhotosAccess) {
      permission === 'granted' ? props.setPhotosAccess('denied') : props.setPhotosAccess('granted')
    }
  }
  return (
    <View style={styles.permissionContainer}>
      <View style={{ flex: 0.1}}>
      <Icon name={props.iconName} type={props.iconType} color={Colors.brigthGreen} size={props.iconSize} />
      </View>
      <View style={{ flex: 0.8}}>
      <Text style={styles.permissionTitle}>{props.permissionTitle}</Text>
      </View>
      <View style={{ flex: 0.1}}>
      <TouchableOpacity 
        onPress={() => changeAccess()}
        >
        <Icon 
          name={props.access === 'camera' 
          ? props.permissions.cameraAccess === 'granted' ? 'check-box' : 'check-box-outline-blank' 
          : props.permissions.photosAccess === 'granted' ? 'check-box' : 'check-box-outline-blank'}
          type='material' 
          color={Colors.brigthGreen} 
          size={30} />
      </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  permissionContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  permissionTitle: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: '800',
    textAlign: 'justify',
    marginLeft: 20
  },
});

const mapStateToProps = (state) => ({
    permissions: state.permissions
  }
);

const mapDispatchToProps = (dispatch) => ({
  setCameraAccess: (status) => dispatch(setCameraAccess(status)),
  setPhotosAccess: (status) => dispatch(setPhotosAccess(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);