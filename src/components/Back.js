import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

const BackArrow = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon 
        color={Colors.brigthGreen}
        type='material'
        name='keyboard-arrow-left'
        size={50}
        />
    </TouchableOpacity>
  );
};

export default BackArrow;