import React, { Component } from 'react';
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux'
import { editUser, uploadImage } from '../redux/actions/user'
import { logout } from '../redux/actions/auth'
import ImagePicker from 'react-native-image-picker'

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

class EditProfile extends Component {
  constructor(props) {
    super(props)
    console.log('ini props edit', props)
    this.state = {
      name: this.props.route.params.name,
      image: this.props.route.params.image,
      imageUrl: this.props.route.params.image,
      username: this.props.route.params.username,
      bio: this.props.route.params.bio,
      email: this.props.route.params.email,
      isLoading: this.props.user.isLoading,
      isLoadingImg: this.props.user.isLoadingImg,
      imgSrc: []
    }
  }

  submit = () => {
    const { name, username, bio, email, imageName } = this.state
    this.props.editUser(email, name, bio, username, imageName).then(() => {
      this.props.logout()
      this.props.navigation.navigate('login')
      Alert.alert('holaa!! edit profile succes', 'Please Login Again')
    }).catch(function () {
      Alert.alert('Sorry', 'Something when wrong')
    })
  }

  selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: '/images',
      },
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const path = response.path;
        console.log('ini path', path)
        this.setState({
          image: path,
          imageName: response.fileName,
          imgSrc: response
        });
      }
    })
  }

  uploadImage = () => {
    const { imageName, image, imgSrc } = this.state

    if (imgSrc.fileSize <= 5000000 && imgSrc.type === 'image/jpeg') {
      this.props.uploadImage(imageName, image).then(() => {
        Alert.alert('Holaa!!', 'Upload Image Succesfully')
      })
    } else {
      Alert.alert('Sorry', 'Please select image less than 5 mb')
    }
  }

  render() {
    const { name, image, bio, username, isLoading, isLoadingImg } = this.state
    return (
      <>
        <StatusBar backgroundColor="#222423" />
        <View style={style.fill}>
          <View style={style.content}>
            <View style={{ ...{ flex: 1 } }}>
              <View style={style.contentProfile}>
                <View style={style.imageWrapper}>
                  <Image source={{ uri: image }} style={style.img} />
                </View>
                <TouchableOpacity
                  onPress={this.selectImage}
                  style={style.btnEditImage}>
                  <Text style={style.btnEditText}>Perbarui Foto Profile</Text>
                </TouchableOpacity>
                {!isLoadingImg ? (
                  <TouchableOpacity style={style.uploadBtn} onPress={this.uploadImage}>
                    <Text style={style.uploadBtnText}>submit</Text>
                  </TouchableOpacity>
                ) : (
                    <View style={style.uploadBtn}>
                      <ActivityIndicator size='small' color='white' />
                    </View>
                  )}
              </View>
              <View style={style.content2}>
                <Text style={style.textContent}>Nama Lengkap</Text>
                <TextInput
                  value={name}
                  onChangeText={(e) => { this.setState({ name: e }) }}
                  style={style.textInput}
                  placeholder="BaniSholih"
                />
                <Text style={style.textContent}>Username</Text>
                <TextInput
                  value={username}
                  onChangeText={(e) => { this.setState({ username: e }) }}
                  style={style.textInput}
                  placeholder="yourUsername"
                />
                <Text style={style.textContent}>Bio</Text>
                <TextInput
                  value={bio}
                  onChangeText={(e) => { this.setState({ bio: e }) }}
                  multiline
                  style={style.textInput}
                  placeholder="bio"
                />
                {/* <Text style={style.textContent}>Email</Text>
                <TextInput style={style.textInput} placeholder="banisholih23@gmail.com" /> */}
              </View>
            </View>
            {!isLoading ? (
              <TouchableOpacity onPress={this.submit} style={style.button}>
                <Text style={style.buttonText}>SUBMIT</Text>
              </TouchableOpacity>
            ) : (
                <View style={style.button}>
                  <Text style={style.buttonText}>SUBMIT</Text>
                </View>
              )}
            <View style={{ ...{ marginTop: 15 } }}>
              <Text style={{ ...{ color: 'red', textAlign: 'center' } }}>
              </Text>
            </View>
          </View>
        </View>
      </>
    )
  }
}

const mapDispatchToProps = { editUser, logout, uploadImage }

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

const style = StyleSheet.create({
  fill: {
    alignSelf: 'stretch',
    flex: 1,
  },
  content: {
    alignSelf: 'stretch',
    margin: 20,
    marginTop: 20,
    flex: 1,
  },
  contentProfile: {
    marginTop: 20,
    // padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'white',
    marginRight: 30,
    borderWidth: 2,
    borderColor: '#2476C3'
  },
  btnEditImage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnEditText: {
    flex: 1,
    // marginTop: 10,
    // marginLeft: 10,
    color: '#06B3BA',
  },
  btnEditText2: {
    marginTop: -20,
    marginRight: 20,
    color: '#06B3BA',
  },
  content2: {
    marginTop: 20,
  },
  textContent: {
    color: '#AAAAAA',
    marginTop: 10,
  },
  textInput: {
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 1,
  },
  contentFill1: {
    alignItems: 'flex-end',
  },
  uploadBtn: {
    marginTop: 50,
    right: 195,
    width: 60,
    height: 22,
    backgroundColor: '#222423',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadBtnText: {
    color: 'white'
  },
  button: {
    alignSelf: 'stretch',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#222423',
    borderRadius: 25,
  },
  img: {
    borderRadius: 50,
    resizeMode: 'cover',
    flex: 1
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
});