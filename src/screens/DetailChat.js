import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Dimensions, StatusBar, 
  TouchableOpacity, Text, FlatList, Image, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

import send from '../assets/images/send.png'
import location from '../assets/images/location.png'

class ChatDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: this.props.route.params.image,
      name: this.props.route.params.name,
      chat: this.props.route.params.chat,
    }
  }
  register = () => {
    this.props.navigation.navigate('register')
  }
  render() {
    const { image, chat, name } = this.state
    return (
      <>
        <StatusBar backgroundColor='#121212' />
        <View style={style.fill}>
          <View style={style.header}>
            <View style={style.imgWrapper}>
              <Image style={style.img} source={{ uri: image }} />
            </View>
            <View>
              <Text style={style.name}>{name}</Text>
              <Text style={style.bio}>Welcome to BansChat</Text>
            </View>
          </View>
          <View style={style.content}>
            <View style={style.chatDisplay}>
              <View style={style.messageReceive}>
                <Text style={style.chat}>{chat}</Text>
              </View>
              <View style={style.messageSend}>
                <Text style={style.chat}>Lu Apaan si boy</Text>
              </View>
            </View>
            <KeyboardAvoidingView behavior={'position'} style={style.avoiding}>
              <View style={style.inputWrapper}>
                <TextInput
                  placeholder='Write a Message'
                  placeholderTextColor='#B8B8B8'
                  style={style.input}
                  multiline
                />
                <TouchableOpacity style={style.btn}>
                  <Icon name="paper-plane" color='white' size={22} />
                </TouchableOpacity>
                <TouchableOpacity style={style.btn2}>
                  <Icon name="map-marker-alt" color='white' size={22} />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </>
    )
  }
}

export default ChatDetail

const style = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#1B1B1B'
  },
  avoiding: {
    flex: 6
  },
  header: {
    height: 60,
    backgroundColor: '#2B2B2B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 50
  },
  imgWrapper: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10
  },
  img: {
    resizeMode: 'cover',
    flex: 1,
    borderRadius: 50
  },
  name: {
    color: 'white',
    fontWeight: 'bold'
  },
  bio: {
    color: '#B8B8B8'
  },
  content: {
    height: deviceHeight - 60
  },
  chatDisplay: {
    flex: 3.5,
  },
  messageReceive: {
    width: deviceWidth - 80,
    height: 70,
    backgroundColor: '#2B2B2B',
    marginTop: 20,
    marginLeft: 10,
    padding: 15,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    // borderBottomRightRadius: 15,
  },
  messageSend: {
    width: deviceWidth - 80,
    alignSelf: 'flex-end',
    height: 70,
    backgroundColor: '#AAAAAA',
    marginTop: 20,
    marginLeft: 10,
    padding: 15,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    // borderBottomLeftRadius: 15,
    marginRight: 10
  },
  chat: {
    color: 'white'
  },
  inputWrapper: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: deviceHeight-500,
    // flexDirection: 'row',
  },
  input: {
    width: deviceWidth - 140,
    height: 50,
    backgroundColor: '#2B2B2B',
    borderRadius: 25,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#AAAAAA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 260,
    bottom: 50
  },
  btn2: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#AAAAAA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 320,
    bottom: 100
  },
  imgBtn: {
    resizeMode: 'cover',
    width: 25,
    height: 25,
  }
})