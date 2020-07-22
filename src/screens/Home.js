import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar
} from 'react-native'

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

class Home extends Component {
  render() {

    const DATA = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
      },
    ];

    chat = () => {
      this.props.navigation.navigate('chat')
    }

    return (
      <>
        <StatusBar backgroundColor='#583A8E' />
        <View style={style.fill}>
          <FlatList
            style={style.content}
            data={DATA}
            renderItem={({ item }) => (
              <TouchableOpacity onPres={() => {this.props.navigation.navigate('chat')}}>
                <View style={style.transactionsList}>
                  <Text style={style.bookTitle}>{item.title}</Text>
                  {/* <Text style={style.bookTitle}>{item.description}</Text> */}
                </View>
                <View style={style.line} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </>
    )
  }
}

export default Home

const style = StyleSheet.create({
  fil: {
    alignSelf: 'stretch',
    height: deviceHeight,
  },
  content: {
    alignSelf: 'stretch',
    margin: 20,
    marginTop: 20,
  },
  transactionsList: {
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bookTitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  line: {
    width: deviceWidth - 30,
    alignSelf: 'center',
    height: 1,
    width: 300,
    backgroundColor: 'black'
  }
})

// class Home extends Component {
//   static navigationOptions = {
//     title: "Home Screen"
//   }

//   chat = () => {
//     this.props.navigation.navigate('chat')
//   }
//   render() {
//     return (
//       <>
//         <View style={styles.container}>
//           <View style={styles.container}>
//             <Button onPress={this.chat}
//               title="Start a Chat" />
//           </View>
//         </View>
//       </>
//     )
//   }
// }

// export default Home

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//   }
// })