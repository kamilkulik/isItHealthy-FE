import 'react-native-gesture-handler';
import React from 'react';
import Camera from './src/components/Camera';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import Colors from './src/constants/Colors';
import Upload from './src/screens/upload';
import isItHealthy from './src/screens/isItHealthy';
import ImagePicker from './src/components/ImagePicker';
import Settings from './src/screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import configureStore from './src/store/reduxStore';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const store = configureStore();

function HomeStack({ route, navigation }) {
  if (route.name === 'Upload') {
    navigation.setOptions({ tabBarVisible: false })
  } else {
    navigation.setOptions({ tabBarVisible: true })
  }
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="ImagePicker" component={ImagePicker}/>
      <Stack.Screen name="Upload" component={Upload}/>
      <Stack.Screen name="isItHealthy" component={isItHealthy}/>
    </Stack.Navigator>
  )
};

function CameraStack({ route, navigation }) {
  if (route.name && route.name === 'Camera') {
    navigation.setOptions({ tabBarVisible: false })
  } else {
    navigation.setOptions({ tabBarVisible: true })
  }
  return (
    <Stack.Navigator initialRouteName="Camera" headerMode="none">
      <Stack.Screen name="Camera" component={Camera}/>
    </Stack.Navigator>
  );
};

function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="Settings" headerMode="none">
      <Stack.Screen name="Settings" component={Settings}/>
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = 'home'
              } else if (route.name === 'Camera') {
                iconName = 'camera-alt'
              } else if (route.name === 'Settings') {
                iconName = 'settings'
              }
              return <Icon name={iconName} size={size} color={color} type='material'/>
            } 
          })}
          tabBarOptions={{
            activeTintColor: Colors.brigthGreen
          }}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Camera" component={CameraStack} />
            <Tab.Screen name="Settings" component={SettingsStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
  );
};

/*

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

*/