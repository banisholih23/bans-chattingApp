import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'
import Tab from '../component/Tab'
import HomeScreen from '../screens/Home'
import ChatScreen from '../screens/Chat'
import ProfileScreen from '../screens/Profile'
import EditProfile from '../screens/EditProfile'

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen component={LoginScreen} name='login' options={{ headerShown: false }} />
            <Stack.Screen component={RegisterScreen} name='register' options={{ headerShown: false }} />
            <Stack.Screen component={Tab} name='mainmenu' options={{ headerShown: false }} />
            <Stack.Screen component={HomeScreen} name='home' options={{ headerShown: false }} />
            <Stack.Screen component={ChatScreen} name='chat' />
            <Stack.Screen component={ProfileScreen} name='profile' options={{ headerShown: false }} />
            <Stack.Screen
              options={{
                title: 'EDIT PROFILE',
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: '#222423',
                },
              }}
              component={EditProfile}
              name={'editProfile'}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    )
  }
}

export default App
