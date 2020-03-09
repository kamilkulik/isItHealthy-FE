import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import ImagePicker from '../components/ImagePicker'

export default function isItHealthy({ route, navigation }) {
  const { photoData } = route.params;

  const [result, setResult] = useState('')
  const [apiRes, setApiRes] = useState('')
  useEffect(() => {
    if (photoData) {
      const { data : { description }} = photoData;
      setApiRes(description)
    } 
  }, [])

  return (
    <React.Fragment>
      {apiRes ? (
        <View style={styles.container}>
        <Text style={styles.checking}>You snapped:</Text>
        <View style={{ flex: 0.4}}>
          <View style={{ flexDirection: 'row' }}>
            <Picker
              selectedValue={result}
              style={{ height: 30, width: 200 }}
              onValueChange={(itemValue) => setResult(itemValue)}
              >
              {Object.entries(apiRes).map(item => {
                return (
                  <Picker.Item key={item[0]} label={item[1]} value={item[1]} />
                )
              })
              }
            </Picker>
          </View>
        </View>
      </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.error}>For some reason the server didn't like your photo. Try uploading another one</Text>
          <ImagePicker navigation={navigation}/>
        </View>
      )
    }
    </React.Fragment>
    );
};

isItHealthy.navigationOptions = (navigationData) => {
  console.log(navigationData)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checking: {
    fontSize: 28,
    textAlign: 'center'
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40
  },
  result: {
    fontSize: 38,
    textAlign: 'center'
  },
  arrow: {
    marginTop: 3
  },
});

/*

<Text style={styles.result}>{ result }</Text>
          <TouchableOpacity 
            style={styles.arrow} 
            onPress={() => picker}>
            <Icon 
              name='keyboard-arrow-down'
              type='material'
              size={38}
              color="#616161"
              containerStyle={styles.arrow}
              />
          </TouchableOpacity>

                    

*/