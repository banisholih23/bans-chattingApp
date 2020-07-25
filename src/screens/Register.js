import React, {Component, useState} from 'react'
import {Text, TextInput, View, Image, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView, ActivityIndicator} from 'react-native';

import bg from '../assets/images/bg.jpg'

import {connect} from 'react-redux'
import {register} from '../redux/actions/auth'
import {addUser} from '../redux/actions/user'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Register extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  login = () => {
    this.props.navigation.navigate('login')
  }

  register = () => {
    const {username, email, password, } = this.state
    this.props.register(email, password).then(() => {
      this.props.addUser(email, username).then(() => {
        this.props.navigation.navigate('login')
        Alert.alert('Holaaa!!', 'Register success please Login!')
      }).catch(function ()  {
        Alert.alert('Sorry', 'Registered failed')
      })
    }).catch(function ()  {
      Alert.alert('Sorry', 'Registered failed')
    })
  }

  render(){
    const {isLoading} = this.props.auth
    return(
      <>
        <KeyboardAvoidingView behavior={'position'} style={loginStyle.parent}>
        <StatusBar backgroundColor='#222423' />
        <Image source={bg} style={loginStyle.accent1} />
        <View style={loginStyle.accent2}>
          <View style={loginStyle.container}>
            {/* <Image source={librarylogo} style={loginStyle.image} /> */}
            <Text style={loginStyle.text}>Ban's-Chat</Text>
            <Text style={loginStyle.text2}>Please Register</Text>
          </View>
        </View>
        <View style={loginStyle.form}>
          <View style={loginStyle.formCard}>
            <View>
              {/* <Image source={email} style={loginStyle.imageUser} /> */}
              <TextInput onChangeText={(e) => {this.setState({username: e})}} placeholder="Username" style={loginStyle.inputStyle} /> 
              <TextInput onChangeText={(e) => {this.setState({email: e})}} placeholder="Email" style={loginStyle.inputStyle} />
              <TextInput
                onChangeText={(e) => {this.setState({password: e})}}
                secureTextEntry={true}
                placeholder="Password"
                style={loginStyle.inputStyle}
              />
            </View>
          </View>
          <View style={loginStyle.link}>
            {!isLoading ? (
              <TouchableOpacity
              onPress={this.register}
              style={loginStyle.submit}>
              <Text style={loginStyle.submitText}>Register</Text>
            </TouchableOpacity>
            ) : (
              <View style={loginStyle.submit}>
                <ActivityIndicator size='large' color='white' />
              </View>
            )}
          <Text style={loginStyle.forgotPassword}>Forgot Password?</Text>
          </View>
          <View style={loginStyle.container2}>
            <TouchableOpacity
              onPress={this.login}
              style={loginStyle.submitRegist}>
              <Text style={loginStyle.textRegister}>Your Already Have Account ? Please Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      </>
    )
  }
}

const mapDispatchToProps = {register, addUser}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)

const accentHeight = 250;

const loginStyle = StyleSheet.create({
  parent: {
    flex: 1,
    position: 'relative',
  },
  accent1: {
    position: 'absolute',
    width: deviceWidth,
    height: 800,
    zIndex: 0,
  },
  accentOverlay: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  accent2: {
    height: accentHeight,
    width: deviceWidth,
    position: 'absolute',
    zIndex: 2,
    padding: 50,
  },
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    alignItems: 'baseline',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 70,
    width: 80,
    height: 80,
  },
  imageUser: {
    position: 'absolute',
    zIndex: 99,
    top: 20,
  },
  imagePass: {
    position: 'absolute',
    zIndex: 99,
    top: 90,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 10,
    fontSize: 30,
  },
  text2: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 5,
    fontSize: 15,
  },
  form: {
    position: 'absolute',
    paddingBottom: 100,
    zIndex: 4,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'flex-end',
  },
  formCard: {
    position: 'relative',
    width: deviceWidth - 20,
    height: 200,
    alignSelf: 'center',
    paddingTop: -10,
    paddingBottom: 30,
  },
  link: {
    marginTop: 50,
    marginBottom: 70,
    paddingRight: 30,
    paddingLeft: 30,
    alignItems: 'baseline',
  },
  forgotPassword: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 40,
    bottom: 25,
    fontSize: 15,
  },
  inputWrapper: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  inputLabel: {
    textTransform: 'uppercase',
    letterSpacing: 5,
  },
  submit: {
    position: 'absolute',
    width: 100,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
    right: 45,
    backgroundColor: '#767677',
    borderRadius: 7,
  },
  submitRegist: {
    position: 'absolute',
    bottom: -100,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 7,
  },
  submitText: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  textRegister: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize: 15,
  },
  inputStyle: {
    marginTop: 15,
    marginLeft: 40,
    width: 300,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
});