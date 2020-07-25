import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth'
import { getUser } from '../redux/actions/user'

import storage from '@react-native-firebase/storage'

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

class Profile extends Component {
  constructor(props) {
    super(props)
    console.log('ini props', props)
    this.state = {
      name: this.props.user.dataUser.fullname,
      imageName: this.props.user.dataUser.image,
      image: 'image',
      email: this.props.auth.email,
      username: this.props.user.dataUser.username,
      bio: this.props.user.dataUser.bio,
      status: this.props.user.dataUser.status,
    }
  }

  editProfile = () => {
    const { name, image, username, bio, status, email } = this.state
    this.props.navigation.navigate('editProfile',
      { image: image, name: name, status: status, username: username, bio: bio, email: email })
  }

  logout = () => {
    this.props.logout()
    this.props.navigation.navigate('login')
  }

  getUrl = () => {
    const { imageName } = this.state
    console.log(imageName)
    storage().ref('/' + imageName).getDownloadURL().then((url) => {
      console.log('ini url', url)
      this.setState({ image: url })
    })
  }

  fetchData = () => {
    const email = this.state.email
    this.props.getUser(email)
  }

  // componentDidUpdate() {
  //   this.props.getUser(this.state)
  //   this.getUrl()
  // }

  componentDidMount() {
    this.fetchData()
    this.getUrl()
  }

  render() {
    const { name, image, status, username, bio, email } = this.state
    const { isLoading } = this.props.user
    console.log(email)
    return (
      <>
        <View style={style.content}>
          <View style={{ ...{ flex: 1 } }}>
            {isLoading ? (
              <View style={style.loading}>
                <ActivityIndicator size='large' color='white' />
              </View>
            ) : (
                <>
                  <View style={style.profile}>
                    <Text style={style.header}>Profile</Text>
                    <View style={style.contentProfile}>
                      <View style={style.imageWrapper}>
                        <Image source={{ uri: image }} style={style.image} />
                      </View>
                      <View style={style.textProfile}>
                        <Text style={style.name}>{name}</Text>
                        <Text style={style.phone}>{email}</Text>
                        <Text style={style.phone}>{status}</Text>
                        <Text style={style.bio}>"{bio}"</Text>
                      </View>
                    </View>
                  </View>
                  <View style={style.contentBadge}>
                    <View style={style.account}>
                      <Text style={style.textBadge}>Account</Text>
                      <TouchableOpacity
                        onPress={this.editProfile}
                        style={style.list}>
                        <Icon name="user-edit" size={22} />
                        <Text style={style.title}>Edit Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={style.contentBadge}>
                    <View style={style.account}>
                      <Text style={style.textBadge}>About</Text>
                      <TouchableOpacity style={style.list}>
                        <Icon Regular name="address-book" size={22} />
                        <Text style={style.title}>Syarat Dan Ketentuan</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
          </View>
          <TouchableOpacity onPress={this.logout} style={style.button}>
            <Text style={style.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
}

const mapDispatchToProps = { logout, getUser }

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const style = StyleSheet.create({
  fill: {
    backgroundColor: '#ECE9F6',
    flex: 1,
  },
  content: {
    alignSelf: 'stretch',
    margin: 20,
    marginTop: 20,
    flex: 1,
  },
  loading: {
    marginTop: 20,
    alignSelf: 'center'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  contentProfile: {
    marginTop: 20,
    // padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    borderRadius: 50,
    resizeMode: 'cover',
    flex: 1
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    marginRight: 30,
    borderWidth: 2,
    borderColor: '#2476C3'
  },
  textProfile: {
    flex: 1,
    fontSize: 14,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  phone: {
    color: '#AAAAAA',
    fontSize: 20,
  },
  bio: {
    marginTop: 10,
    color: '#AAAAAA',
    fontStyle: 'italic',
    fontSize: 17,
  },
  contentBadge: {
    margin: -5,
    marginTop: 20,
    paddingLeft: 10,
    backgroundColor: '#fff',
    width: deviceWidth - 33,
    // height: deviceHeight,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  account: {
    marginTop: 10,
    marginBottom: 15,
  },
  textBadge: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  list: {
    alignSelf: 'stretch',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  button: {
    alignSelf: 'stretch',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    backgroundColor: '#222423',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});