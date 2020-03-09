import 'react-native-gesture-handler';
import React from 'react';
import { View, Button } from 'react-native';
import Camera from './src/components/Camera';
import isItHealthy from './src/screens/isItHealthy';
import upload from './src/screens/upload';
import ImagePicker from './src/components/ImagePicker';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#fff' }}>
      <Button
        title="Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <ImagePicker 
        navigation={navigation}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen 
          name="isItHealthy" 
          component={isItHealthy}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                title='Home Screen'
                onPress={() => (navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      { name: 'HomeScreen' },
                    ],
                  })
                ))}
              />
            )
          })}
          />
        <Stack.Screen 
          name="upload" 
          component={upload} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
