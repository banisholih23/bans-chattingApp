import React, { Component } from 'react'
import {
  View, TextInput, StyleSheet, Dimensions, StatusBar, TouchableOpacity, 
  Text, Image, Alert, ActivityIndicator, ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { getUser } from '../redux/actions/user'
import storage from '@react-native-firebase/storage'
import userProfile from '../assets/images/bg.jpg'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

class StartChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      bio: '',
      status: '',
      image: 'https://i.pinimg.com/originals/10/41/b4/1041b40c95d2c26ba1a7d0f356cbb8c9.jpg',
      imageName: '',
      location: {},
      email: ''
    }
  }

  startChat = () => {
    const { name, image, email, bio, username, status, location } = this.state

    this.props.navigation.navigate('detailChat', {
      name: name,
      image: image,
      email: email,
      myEmail: this.props.auth.email,
      bio: bio,
      username: username,
      status: status,
      location: location
    })
  }

  handleSearch = () => {
    const { email } = this.state

    this.props.getUser(email).then(() => {
      this.setState({
        name: this.props.user.dataUser.fullname,
        imageName: this.props.user.dataUser.image,
        username: this.props.user.dataUser.username,
        bio: this.props.user.dataUser.bio,
        status: this.props.user.dataUser.status,
        location: this.props.user.dataUser.location
      })
      this.getUrl()
    }).catch(function () {
      Alert.alert('Sorry', `Can't found User ${email}`)
    })
  }

  getUrl = () => {
    const { imageName } = this.state
    storage().ref(imageName).getDownloadURL().then((url) => {
      this.setState({ image: url })
    })
  }

  render() {
    const { name, username, bio, image, status } = this.state
    const { isLoading } = this.props.user
    return (
      <>
        <StatusBar backgroundColor='#121212' />
        <ScrollView>
          <View style={style.fill}>
            {isLoading ? (
              <View style={style.loading}>
                <ActivityIndicator size='large' color='white' />
              </View>
            ) : (
                <>
                  <View style={style.imgWrapper}>
                    <Image
                      source={{ uri: image }}
                      style={style.img}
                    />
                  </View>
                  <View style={style.form}>
                    <View style={style.formInput}>
                      <TextInput
                        onChangeText={(e) => { this.setState({ email: e }) }}
                        placeholder="Search Friend..." placeholderTextColor='#B8B8B8' style={style.inputStyle}
                      />
                    </View>
                  </View>
                  <TouchableOpacity style={style.iconSearch} onPress={this.handleSearch}>
                    <Icon name="search" color={'#AAAAAA'} size={25} />
                  </TouchableOpacity>
                  <View style={style.content}>
                    <View style={style.contentWrapper}>
                      <Text style={style.title}>Name</Text>
                      <Text style={style.value}>{name}</Text>
                      <View style={style.line} />
                    </View>
                    <View style={style.contentWrapper}>
                      <Text style={style.title}>Username</Text>
                      <Text style={style.value}>{`@${username}`}</Text>
                      <View style={style.line} />
                    </View>
                    <View style={style.contentWrapper}>
                      <Text style={style.title}>Bio</Text>
                      <Text style={style.value}>{bio}</Text>
                      <View style={style.line} />
                    </View>
                    <View style={style.contentWrapper}>
                      <Text style={style.title}>Status</Text>
                      <Text style={style.value}>{status}</Text>
                      <View style={style.line} />
                    </View>
                    {username === '-' ? (
                      <>
                      </>
                    ) : (
                        <TouchableOpacity style={style.btnStartChat} onPress={this.startChat}>
                          <Text style={style.btnStartText}>START CHAT</Text>
                        </TouchableOpacity>
                      )}
                  </View>
                </>
              )}
          </View>
        </ScrollView>
      </>
    )
  }
}

const mapDispatchToProps = { getUser }
const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(StartChat)

const style = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    height: deviceHeight
  },
  loading: {
    alignSelf: 'center',
    marginTop: 50
  },
  header: {
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  iconSearch: {
    zIndex: 12,
    top: 40,
    right: -320,
  },
  inputStyle: {
    marginTop: 180,
    marginLeft: 20,
    width: 350,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 10,
    backgroundColor: '#2C2B2C',
    color: '#B8B8B8'
  },
  form: {
    marginTop: 40,
    marginBottom: 50,
    position: 'absolute',
    zIndex: 4,
    justifyContent: 'flex-end',
  },
  formInput: {
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 50,
  },
  searchInput: {
    width: 200,
    height: 40,
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#2B2B2B',
    paddingLeft: 10,
    paddingRight: 10
  },
  searchBtn: {
    width: 80,
    height: 40,
    backgroundColor: '#2476C3',
    borderRadius: 10,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBtnText: {
    color: 'white',
    fontWeight: 'bold'
  },
  imgWrapper: {
    width: 400,
    height: 200,
    backgroundColor: 'white',
    borderWidth: 3,
    // borderColor: '#2476C3',
    alignSelf: 'center'
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    marginTop: 70
  },
  contentWrapper: {
    width: deviceWidth - 50,
    alignSelf: "center",
    marginTop: 10
  },
  title: {
    color: '#B8B8B8'
  },
  value: {
    color: 'white',
    fontSize: 20
  },
  line: {
    width: deviceWidth - 50,
    height: 5,
    alignSelf: 'center',
    backgroundColor: '#2C2B2C',
    marginTop: 10
  },
  btnStartChat: {
    width: deviceWidth - 50,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#2C2B2C',
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: 'center',
    marginTop: deviceHeight - 730,
    marginBottom: 30
  },
  btnStartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})