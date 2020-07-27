import React, { Component } from 'react'
import {View, TextInput, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Text, FlatList, Image, ActivityIndicator} 
from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import database from '@react-native-firebase/database';

import {connect} from 'react-redux'
import {getUser, sendLocation, friends} from '../redux/actions/user'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: this.props.auth.email,
      friends_: [],
      isLoading: true
    }
  }

  register = () => {
    this.props.navigation.navigate('register')
  }
  fetchUser = () => {
    const email = this.state.email
    this.props.getUser(email)
  }

  startChat = () => {
    this.props.navigation.navigate('startChat')
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    const {isLoading} = this.props.user
    const data = [
      {
        id: 1,
        name: 'Agoy Jaktim',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1JRPcO1GNPyh9YBCIs9xHehNv4tgtOcsaUA&usqp=CAU',
        chat: 'Lu jangan gitu boy',
        date: '17:38'
      },
      {
        id: 2,
        name: 'Agoy Jakbar',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1JRPcO1GNPyh9YBCIs9xHehNv4tgtOcsaUA&usqp=CAU',
        chat: 'Lagi apa lu boy?',
        date: '10:38'
      },
      {
        id: 3,
        name: 'Agoy Jakpus',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1JRPcO1GNPyh9YBCIs9xHehNv4tgtOcsaUA&usqp=CAU',
        chat: 'boy tawuran kuy?',
        date: '10:12'
      },
      {
        id: 4,
        name: 'Agoy Jakut',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1JRPcO1GNPyh9YBCIs9xHehNv4tgtOcsaUA&usqp=CAU',
        chat: 'hidup itu sususah boyyy',
        date: '10:05'
      },
      {
        id: 5,
        name: 'Agoy Bekasi',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1JRPcO1GNPyh9YBCIs9xHehNv4tgtOcsaUA&usqp=CAU',
        chat: 'pusing ah ngoding mulu boy',
        date: '9:324'
      }
    ]
    return (
      <>
        <StatusBar backgroundColor='#222423' />
        <View style={style.fill}>
          {isLoading ? (
            <View style={style.loading}>
              <ActivityIndicator size='large' color='white' />
            </View>
          ):(
            <>
              <View style={style.chatWrapper}>
                <View style={style.header}>
                  <TextInput 
                    placeholder='Search' 
                    placeholderTextColor='#B8B8B8'
                    style={style.searchInput}
                  />
                  {/* <Icon name="search" color={'white'} size={20} /> */}
                </View>
                {/* <View>
                  <FlatList
                    data={data}
                    style={style.flatList}
                    renderItem={({item}) => (
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('detailChat', 
                      {image: item.image, name: item.name, chat: item.chat})}>
                        <List
                          name={item.name}
                          image={item.image}
                          chat={item.chat}
                          date={item.date}
                        />
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                  />
                </View> */}
              </View>
              <View style={style.btnWrapper}>
                <TouchableOpacity onPress={this.startChat} style={style.btn} >
                  <Icon name="user-edit" color='white' size={22} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </>
    )
  }
}

class List extends Component {
  render(){
    return(
      <>
        <View style={style.listWrapper}>
          <View style={style.chatInfoWrapper}>
            <View style={style.imgWrapper}>
              <Image 
                source={{uri: this.props.image}}
                style={style.img}
              />
            </View>
            <View>
              <Text style={style.chatTitle}>{this.props.name}</Text>
              <Text style={style.chatSubTitle}>{this.props.chat}</Text>
            </View>
          </View>
          <Text style={style.chatDate}>{this.props.date}</Text>
        </View>
        {/* <View style={style.line} /> */}
      </>
    )
  }
}

const mapDispatchToProps = {getUser}
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

const style = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#1B1B1B'
  },
  loading: {
    marginTop: 20,
    alignSelf: 'center'
  },
  chatWrapper: {
    backgroundColor: '#1B1B1B',
    flex: 5
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  searchInput: {
    width: 350,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    color: 'white',
    backgroundColor: '#383838',
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
  flatList: {
    marginBottom: 15
  },
  listWrapper: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center'
  },
  chatInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    marginRight: 10
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 50
  },
  chatTitle: {
    color: 'white',
    fontWeight: 'bold'
  },
  chatSubTitle: {
    color: 'white',
  },
  chatDate: {
    marginRight: 20,
    color: '#AAAAAA',
  },
  line: {
    width: deviceWidth-150,
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#AAAAAA',
    marginTop: 10
  },
  btnWrapper: {
    marginTop: -200,
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 30
  },
  btn: {
    width: 50,
    height: 50,
    backgroundColor: '#AAAAAA',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35
  }
})