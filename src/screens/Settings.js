import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import BackArrow from '../components/Back';
import Card from '../components/Card';
import PermissionCard from '../components/PermissionCard';
import { setCameraAccess, setPhotosAccess } from '../actions/permissions';

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.12, justifyContent: 'flex-end', alignItems: 'flex-start', marginLeft: -15 }} >
        <BackArrow navigation={navigation}/>
      </View>
      <View style={{ flex: 0.1, justifyContent: 'center' }} >
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={{ flex: 0.1 }} >
        <Text style={styles.paragraph}>Here you can adjust permissions given to the app. Please check all of them if you want to use all features.</Text>
      </View>
      <View style={{ flex: 0.68, paddingVertical: 20 }} >
        <Card>
          <PermissionCard 
            iconName='camera-alt'
            iconType='material'
            iconSize={30}
            permissionTitle='Allow access to camera'
            reduxAction={setCameraAccess}
            access={'camera'}
          />
        </Card>
        <Card style={{ marginTop: 25 }}>
          <PermissionCard 
            iconName='photo'
            iconType='material'
            iconSize={30}
            permissionTitle='Allow access to gallery'
            reduxAction={setPhotosAccess}
            access={'photos'}
          />
      </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800'
  },
  paragraph: {
    fontSize: 16,
    color: Colors.darkGray,
    fontWeight: '500',
    textAlign: 'justify'
  },
});

export default Settings;

