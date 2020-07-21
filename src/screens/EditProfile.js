import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  CheckBox,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

class EditProfile extends Component {
  submit = () => {
    this.props.navigation.navigate('profile')
  }

  render(){
    return(
      <>
        <StatusBar backgroundColor="#222423" />
        <View style={style.fill}>
          <View style={style.content}>
            <View style={{...{flex: 1}}}>
              <View style={style.contentProfile}>
                <View style={style.imageWrapper}>
                </View>
                <TouchableOpacity
                  style={style.btnEditImage}>
                  <Text style={style.btnEditText}>Perbarui Foto Profile</Text>
                </TouchableOpacity>
              </View>
              <View style={style.content2}>
                <Text style={style.textContent}>Nama Lengkap</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="BaniSholih"
                />
                <Text style={style.textContent}>Nomor Ponsel</Text>
                <TextInput
                  style={style.textInput}
                  placeholder="082112720993"
                />
                <Text style={style.textContent}>Email</Text>
                <TextInput style={style.textInput} placeholder="banisholih23@gmail.com" />
              </View>
            </View>
            <TouchableOpacity onPress={this.submit} style={style.button}>
              <Text style={style.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
            <View style={{...{marginTop: 15}}}>
              <Text style={{...{color: 'red', textAlign: 'center'}}}>
              </Text>
            </View>
          </View>
        </View>
      </>
    )
  }
}

export default EditProfile

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
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEditImage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnEditText: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
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
  button: {
    alignSelf: 'stretch',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#222423',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
});