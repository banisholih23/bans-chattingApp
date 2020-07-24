import React, {Component} from 'react'
import {View, Dimensions} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Maps extends Component {
  constructor(props){
    super(props)
    this.state = {
      region: {}
    }
  }

  onRegionChange = (info) => {
    if(info.coords){
      this.setState({
        region: {
          longitude: info.coords.longitude, 
          latitude: info.coords.latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922
        }
      })
    } else {
      this.setState({region: info})
    }
  }

  onDragMarker = () => {
    Geolocation.getCurrentPosition(info => {
      this.setState({
        markerPosition: {
        longitude: info.coords.longitude, 
        latitude: info.coords.latitude
        }
      })
      this.onRegionChange(info)
    })
  }
  
  componentDidMount(){
    this.onDragMarker() 
  }
  render(){
    return(
      <>  
        <View style={{flex : 1}}>
          <MapView
            style={{width: deviceWidth, height: deviceHeight}}
            initialRegion={this.state.region}
            region={this.state.region}
            // onRegionChange={this.onRegionChange}
          >
          <Marker draggable coordinate={this.state.markerPosition}
            onDragEnd={(e) => this.onDragMarker({markerPosition: e.nativeEvent.coordinate})} 
            title={'My Location'} 
            description={'Maps'} 
          />
          </MapView>
        </View>
      </>
    )
  }
}

export default Maps