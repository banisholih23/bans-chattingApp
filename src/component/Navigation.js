import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'
import { connect } from 'react-redux'

import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'
import Tab from '../component/Tab'
import HomeScreen from '../screens/Home'
import ChatScreen from '../screens/Chat'
import ProfileScreen from '../screens/Profile'
import EditProfile from '../screens/EditProfile'
import Location from '../screens/Maps'
import DetailChat from '../screens/DetailChat'

const Stack = createStackNavigator();

class App extends Component {
  render() {
    const { isLogin } = this.props.auth
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            {!isLogin && (
              <>
                <Stack.Screen component={LoginScreen} name='login' options={{ headerShown: false }} />
                <Stack.Screen component={RegisterScreen} name='register' options={{ headerShown: false }} />
              </>
            )}
            {isLogin && (
              <>
                <Stack.Screen component={Tab} name='mainmenu' options={{ headerShown: false }} />
                <Stack.Screen component={ChatScreen} name='chat' options={{ headerShown: false }} />
                <Stack.Screen component={ProfileScreen} name='profile' options={{ headerShown: false }} />
                <Stack.Screen component={LoginScreen} name='login' options={{ headerShown: false }} />
                <Stack.Screen component={Location} name='maps' options={{ headerShown: false }} />
                <Stack.Screen
                  component={DetailChat}
                  name='detailChat'
                  options={{
                    title: '',
                    headerTransparent: true,
                    headerTintColor: 'white'
                  }}
                />
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
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(App)
