import React, { Component } from 'react'
import { Text, TextInput, View, Image, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import bg from '../assets/images/bg.jpg'

import { connect } from 'react-redux'
import { login } from '../redux/actions/auth'
import { getUser } from '../redux/actions/user'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  register = () => {
    this.props.navigation.navigate('register')
  }

  fetchUser = () => {
    const email = 'bani@mail.com'
    this.props.getUser(email)
  }

  login = () => {
    const { email, password } = this.state
    this.props.login(email, password).then(() => {
      this.props.navigation.navigate('mainmenu')
    }).catch(function () {
      Alert.alert('Ooops!', 'Incorrect email or password :(')
    })

  }

  render() {
    const loading = {
      user: this.props.user.isLoading,
      auth: this.props.auth.isLoading
    }
    return (
      <>
        <KeyboardAvoidingView behavior={'position'} style={loginStyle.parent}>
          <StatusBar backgroundColor='#222423' />
          <Image source={bg} style={loginStyle.accent1} />
          <View style={loginStyle.accent2}>
            <View style={loginStyle.container}>
              {/* <Image source={librarylogo} style={loginStyle.image} /> */}
              <Text style={loginStyle.text}>Ban's-Chat</Text>
              <Text style={loginStyle.text2}>Please Login</Text>
            </View>
          </View>
          <View style={loginStyle.form}>
            <View style={loginStyle.formCard}>
              <View>
                {/* <Image source={email} style={loginStyle.imageUser} /> */}
                <TextInput onChangeText={(e) => { this.setState({ email: e }) }} placeholder="Email" style={loginStyle.inputStyle} />
                {/* <Image source={pass} style={loginStyle.imagePass} /> */}
                <TextInput
                  onChangeText={(e) => { this.setState({ password: e }) }}
                  secureTextEntry={true}
                  placeholder="Password"
                  style={loginStyle.inputStyle}
                />
              </View>
            </View>
            <View style={loginStyle.link}>
              {!loading.user && !loading.auth ? (
                <TouchableOpacity
                  onPress={this.login}
                  style={loginStyle.submit}>
                  <Text style={loginStyle.submitText}>Login</Text>
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
                onPress={this.register}
                style={loginStyle.submitRegist}>
                <Text style={loginStyle.textRegister}>Don't Have Account ? Please Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    )
  }
}

const mapDispatchToProps = { login, getUser }

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
    paddingTop: 50,
    paddingBottom: 50,
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
    right: 50,
    backgroundColor: '#767677',
    borderRadius: 7,
  },
  submitRegist: {
    position: 'absolute',
    bottom: -100,
    right: 70,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 7,
  },
  submitText: {
    fontSize: 17,
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
    marginTop: 20,
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