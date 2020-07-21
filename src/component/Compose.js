import React, {Component} from 'react';
import { View, StyleSheet, Keyboard, Button, TextInput } from 'react-native';

class Compose extends Component {
  render() {
    return (
      <>
        <View style={styles.compose}>
          <TextInput
            style={styles.composeText}
            editable={true}
            maxLength={40}
          />
          <Button
            title="Send"
          />
        </View>
      </>
    )
  }
}

export default Compose

const styles = StyleSheet.create({
  composeText: {
    width: '80%',
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#979797',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  compose: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10
  }
});
