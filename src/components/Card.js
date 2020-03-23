import React from 'react';
import { View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  )
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    backgroundColor: Colors.white,
    elevation: 5,
    padding: 20,
    borderRadius: 4
  }
});

export default Card;