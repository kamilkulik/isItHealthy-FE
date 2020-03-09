import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { sendToAPI } from '../utils/APIservices';

export default function upload({ route, navigation }) {
  const { selectedPhoto } = route.params;
  const [response, setResponse] = useState(null);

  useFocusEffect(() => {
    async function fetchData() {
      let apiRes = await sendToAPI(selectedPhoto)
      setResponse(apiRes)
    }
    fetchData()
  }, [])

  useFocusEffect(() => {
    return () => {
      setResponse(null)
    }
  }, [])

  if (response !== null) {
    navigation.navigate('isItHealthy', { photoData: response })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.checking}>Uploading...</Text>
      <Image 
        source={{ uri: selectedPhoto.uri }}
        style={styles.preview}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checking: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 100
  },
  preview: {
    width: 350,
    height: 350
  }
});