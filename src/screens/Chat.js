import React, { Component } from 'react'
import { Text, ImageBackground, StyleSheet, FlatList } from 'react-native'
import Message from '../component/Message'
import Compose from '../component/Compose'

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with Bani`
  })
  render() {
    return (
      <>
        <ImageBackground
          style={[styles.container, styles.backgroundImage]}
          source={require('../assets/images/bg.jpg')}>
          <FlatList
            style={styles.container}
            renderItem={Message}
            keyExtractor={(item, index) => (`message-${index}`)}
          />
          <Compose />
        </ImageBackground>
      </>
    )
  }
}

export default Chat

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'transparent'
  },
  listItem: {
      width: '70%',
      margin: 10,
      padding: 10,
      backgroundColor: 'white',
      borderColor: '#979797',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 10
  },
  incomingMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#E1FFC7'
  } 
})