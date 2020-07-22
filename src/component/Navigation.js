import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'
import Tab from '../component/Tab'
import HomeScreen from '../screens/Home'
import ChatScreen from '../screens/Chat'
import ProfileScreen from '../screens/Profile'
import EditProfile from '../screens/EditProfile'

const Stack = createStackNavigator();

const App = () => {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();

  const authCheck = _user => {
    setUser(_user);
    if (init) {
      setInit(false);
    }
  };
  useEffect(() => {
    const sub = auth().onAuthStateChanged(authCheck);
    return sub;
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {!user && (
            <>
              <Stack.Screen component={LoginScreen} name='login' options={{ headerShown: false }} />
              <Stack.Screen component={RegisterScreen} name='register' options={{ headerShown: false }} />
            </>
          )}
          {user && (
            <>
              <Stack.Screen component={Tab} name='mainmenu' options={{ headerShown: false }} />
              <Stack.Screen component={HomeScreen} name='home' options={{ headerShown: false }} />
              <Stack.Screen component={ChatScreen} name='chat' options={{ headerShown: false }} />
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App
