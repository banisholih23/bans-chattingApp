import React, { Component } from 'react'

import { Text, TextInput, Button, View, Image, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';

class Home extends Component {
  static navigationOptions = {
    title: "Home Screen"
  }

  chat = () => {
    this.props.navigation.navigate('chat')
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.container}>
            <Button onPress={this.chat}
              title="Start a Chat" />
          </View>
        </View>
      </>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
})