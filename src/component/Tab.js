import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../screens/Home'
import Chat from '../screens/Chat'
import Profile from '../screens/Profile'

const BottomTab = createBottomTabNavigator();

class Tab extends Component {
  render() {
    return (
      <>
        <BottomTab.Navigator
          tabBarOptions={{
            style: {
              backgroundColor: '#222423'
            },
            activeTintColor: 'white'
          }}>
          <BottomTab.Screen
          options={{
            title: 'Home',
            tabBarIcon: () => (
              <Icon name="home" color={'white'} size={20} />
            ),
          }}
          component={Home}
          name="home"
          />
          <BottomTab.Screen
          options={{
            title: 'Chat',
            tabBarIcon: () => (
              <Icon name="comments" color={'white'} size={20} />
            ),
          }}
          component={Chat}
          name="chat"
          />
          <BottomTab.Screen
          options={{
            title: 'Profile',
            tabBarIcon: () => (
              <Icon name="user" color={'white'} size={20} />
            ),
          }}
          component={Profile}
          name="profile"
          />
        </BottomTab.Navigator>
      </>
    )
  }
}

export default Tab