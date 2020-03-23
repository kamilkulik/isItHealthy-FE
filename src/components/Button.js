import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../constants/Colors';

const CustomButton = props => {
  return (
    <View style={{...styles.button, ...props.style}}>
      {props.children}
    </View>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.brigthGreen,
    shadowColor: Colors.brigthGreen,
    shadowOffset: { width: 3, height: 6 },
    shadowRadius: 10,
    shadowOpacity: 0.46,
    elevation: 5,
    padding: 15,
    borderRadius: 6,
    width: 300,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.brigthGreen,
  }
});

export default CustomButton;