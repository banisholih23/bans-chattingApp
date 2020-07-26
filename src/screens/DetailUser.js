import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity,Text, Image } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

class UserDetail extends Component {
  constructor(props) {
    super(props)
    console.log('ini props', props)
    this.state = {
      image: this.props.route.params.image,
      name: this.props.route.params.name,
      username: this.props.route.params.username,
      bio: this.props.route.params.bio,
      status: this.props.route.params.status,
      location: this.props.route.params.location,
    }
  }
  location = () => {
    this.props.navigation.navigate('friendLoc', { location: this.state.location })
  }
  render() {
    const { image, name, bio, username, status } = this.state
    return (
      <>
        <StatusBar backgroundColor='#121212' />
        <View style={style.fill}>
          <View style={style.imgWrapper}>
            <Image source={{ uri: image }} style={style.img} />
          </View>
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
          </View>
          <TouchableOpacity style={style.locationWrapper} onPress={this.location}>
            <Icon style={{alignItems: 'center', marginBottom: 10}} name='map-marked-alt' color={'white'} size={40} />
            <Text style={style.btnEditText}>Find Location</Text>
            <Text style={style.locationInfo}>Tap to see location</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
}

export default UserDetail

const style = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#1B1B1B'
  },
  imgWrapper: {
    width: deviceWidth,
    height: 250,
    backgroundColor: 'pink',
  },
  img: {
    flex: 1,
    resizeMode: 'cover'
  },
  btnEditText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2
  },
  locationWrapper: {
    width: deviceWidth - 50,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30
  },
  locationInfo: {
    color: 'white',
    marginTop: 10,
    fontSize: 15
  },
  content:{
    marginTop: 40,
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
})