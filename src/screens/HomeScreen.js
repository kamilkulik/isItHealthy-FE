import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Colors from '../constants/Colors';
import ImagePicker from '../components/ImagePicker';
import CustomButton from '../components/Button';
import CrossHair from '../components/CrossHair';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
      <View style={styles.homeContainer}>
        <CrossHair size={300}/>
        <View style={{ flexDirection: 'row', marginTop: 50 }}>
          <Text style={styles.homeTitleOne}>isIt</Text><Text style={styles.homeTitleTwo}>Healthy</Text>
        </View>
        <Text style={styles.description}>Snap food or select photo from your device and find out if it's healhy or not. Under the hood, our app uses Machine Learning to process your image.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Camera')}
        >
          <CustomButton style={styles.button}>
            <Text style={styles.text}>Camera</Text>
          </CustomButton>
        </TouchableOpacity>
        <ImagePicker 
          navigation={navigation}
          style={styles.buttonCamera}
          textStyle={styles.textCamera}
        />
      </View>
      <View style={{ flex: 0.05}}></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 0.8,
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeTitleOne: {
    color: Colors.darkGray,
    fontSize: 50,
    fontWeight: '600',
  },
  homeTitleTwo: {
    color: Colors.brigthGreen,
    fontSize: 50,
    fontWeight: '600',
  },
  description: {
    marginTop: 30,
    color: Colors.black,
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 0.15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  button:{
    width: 170,
  },
  buttonCamera: {
    backgroundColor: Colors.white,
    width: 170,
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  textCamera: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.brigthGreen,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});