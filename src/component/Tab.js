import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../screens/Home'
import Chat from '../screens/Chat'
import Profile from '../screens/Profile'
import Maps from '../screens/Maps'

const Top = createMaterialTopTabNavigator();

class Tab extends Component {
  render() {
    return (
      <>  
        {/* <View style={{ backgroundColor: '#1B1B1B'}}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}></View>
        <View style={{ height: 50, justifyContent: 'center', marginLeft: 20 }}></View>
        <Text style={{ color: 'white', fontSize: 19 }}>Whatsapp</Text> */}
        <View style={style.header}>
          <View style={style.textPosition}>
            <Text style={style.textStyle}>BansChat</Text>
          </View>
        </View>
        <Top.Navigator
         tabBarOptions={{
          style: {
            backgroundColor: '#222423',
          },
            activeTintColor: 'white',
          }}
        >
          {/* <Top.Screen name='home' component={Home} /> */}
          <Top.Screen name='chat' component={Chat} />
          <Top.Screen name='maps' component={Maps} />
          <Top.Screen name='profile' component={Profile} />
        </Top.Navigator>
      </>
    )
  }
}

export default Tab

const style = StyleSheet.create({
  header:{
    backgroundColor: '#222423',
    height: 60,
  },
  textPosition:{
    marginTop: 20,
    marginLeft: 20
  },
  textStyle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  }
})