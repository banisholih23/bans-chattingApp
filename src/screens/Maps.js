import React, {Component} from 'react'
import {View, ActivityIndicator, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Text, Alert} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import {connect} from 'react-redux'
import {sendLocation} from '../redux/actions/user'
import Geolocation from '@react-native-community/geolocation'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

class Location extends Component {
  constructor(props){
    super(props)
    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      email: this.props.auth.email,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }
  
  shareLoc = () => {
    const {region, email} = this.state
    this.props.sendLocation(email, region.latitude, region.longitude).then(() => {
      Alert.alert('Success!', 'Your location has been shared')
    }).catch(function() {
      Alert.alert('Sorry', 'Failed to share location')
    })
  }

  componentDidUpdate(){
    console.log(this.state.region)
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(info => this.setState({
      latitude: info.coords.latitude,
      longitude: info.coords.longitude,
      region:{
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
      }
    }))
  }

  componentDidMount(){
   this.getLocation()
  }
  render() {
    const {latitude, longitude, latitudeDelta, longitudeDelta} = this.state
    const {isLoadingLoc, isLoading} = this.props.user
    return(
      <>
        <StatusBar backgroundColor='#222324' />
        <View style={style.fill}>
          {isLoading? (
            <View style={style.loading}>
              <ActivityIndicator size='large' color='white' />
            </View>
          ):(
            <>
              <View style={style.mapWrapper}>
                <MapView
                  style={style.map}
                  initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta,
                  }}>
                  <Marker draggable
                    coordinate={this.state.region}
                    onDragEnd={(e) => this.setState({ region: e.nativeEvent.coordinate })}
                  />
                </MapView>
              </View>
              {isLoadingLoc ? (
                <View style={style.btnEdit}>
                  <ActivityIndicator size='small' color='white' />
                </View>
              ):(
                <TouchableOpacity style={style.btnEdit} onPress={this.shareLoc}>
                  <Text style={style.btnEditText}>SHARE MY LOCATION</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </>
    )
  }
}

const mapDispatchToProps = {sendLocation}
const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Location)

const style = StyleSheet.create({
  fill: {
    flex: 1,
    // backgroundColor: '#1B1B1B'
  },
  loading: {
    marginTop: 20,
    alignSelf: 'center'
  },
  mapWrapper: {
    width: deviceWidth,
    height: deviceHeight,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  btnEdit: {
    width: 300,
    marginTop: deviceHeight - 1050,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#2C2B2C',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnEditText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  locationWrapper: {
    width: 300,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2B2B2B',
    alignSelf: 'center',
    marginTop: 40
  },
  locationInfo: {
    color: 'white',
    marginTop: 20
  }
})