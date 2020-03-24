import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { sendToAPI } from '../utils/APIservices';
import ActivityIndicator from '../components/activityIndicator';
import Colors from '../constants/Colors'

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
      <View style={styles.previewContainer}>
        <Image 
          source={{ uri: selectedPhoto.uri }}
          style={styles.preview}
          resizeMode='contain'
        />
      </View>
      <ActivityIndicator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checking: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 100,
    color: Colors.darkGray,
    fontWeight: '800',
  },
  previewContainer: {
    width: 350,
    height: 400,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 15,
    shadowOpacity: 0.6,
    elevation: 5,
  },
  preview: {
    width: '100%',
    height: '100%',
  }
});