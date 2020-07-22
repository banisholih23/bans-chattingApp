import React, { Component } from 'react'
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const Profile = () => {
  const navigation = useNavigation();
  const user = auth().currentUser;

  const onLogout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      Alert.alert(e.code);
    }
  };
  return (
    <>
      <View style={style.content}>
        <View style={{ ...{ flex: 1 } }}>
          <View style={style.profile}>
            <Text style={style.header}>Profile</Text>
            <View style={style.contentProfile}>
              <View style={style.imageWrapper}>
                <Image style={style.image} />
              </View>
              <View style={style.textProfile}>
                <Text style={style.name}>{user.email}</Text>
                <Text style={style.phone}>082112720993</Text>
              </View>
            </View>
          </View>
          <View style={style.contentBadge}>
            <View style={style.account}>
              <Text style={style.textBadge}>Account</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('editProfile')}
                style={style.list}>
                <Icon name="user-edit" size={22} />
                <Text style={style.title}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={style.contentBadge}>
              <View style={style.account}>
                <Text style={style.textBadge}>About</Text>
                <TouchableOpacity style={style.list}>
                  <Icon Regular name="address-book" size={22} />
                  <Text style={style.title}>Syarat Dan Ketentuan</Text>
                </TouchableOpacity>
              </View>
            </View> */}
        </View>
        <TouchableOpacity onPress={onLogout} style={style.button}>
          <Text style={style.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Profile

const style = StyleSheet.create({
  fill: {
    backgroundColor: '#ECE9F6',
    flex: 1,
  },
  content: {
    alignSelf: 'stretch',
    margin: 20,
    marginTop: 70,
    flex: 1,
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
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
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