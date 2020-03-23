import React from 'react';
import { Icon } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const CrossHair = props => {
  return (
    <View>
      <Icon 
        name='crop-free'
        type='material'
        size={props.size}
        color={Colors.brigthGreen}
        />
    </View>
  )
};

const styles = StyleSheet.create({

});

export default CrossHair;