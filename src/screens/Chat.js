import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, FlatList} from 'react-native';
import {Header} from 'react-native-elements';
import {GiftedChat} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const ChatPersonal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [messages, setMessages] = useState([]);

  const sendFriendId = route.params;
  const userId = auth().currentUser.uid;

  useEffect(() => {
    ReceiveMessage();
  }, []);

  const ReceiveMessage = () => {
    database()
      .ref(`/chat/${sendFriendId}/${userId}`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const {timestamp, text, user} = doc.val();
          const {key: _id} = doc;
          const message = {_id, createdAt: timestamp, text, user};
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, message),
          );
        });
      });
  };

  const sendMessage = useCallback((messages = []) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        text,
        user,
        timestamp: new Date().getTime(),
      };
      const send = database().ref(
        `/chat/${userId}/${sendFriendId}/${new Date().getTime()}`,
      );
      const receive = database().ref(
        `/chat/${sendFriendId}/${userId}/${new Date().getTime()}`,
      );
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
      );
      send.set(message);
      receive.set(message);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        placement="left"
        leftComponent={{
          onPress: () => navigation.goBack(),
          icon: 'arrow-back',
          color: '#fff',
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => sendMessage(messages)}
        user={{
          _id: userId,
          name: 'avatar',
          avatar:
            'http://www.hidoctor.ir/wp-content/uploads/2014/02/Model-lebas-parastar-24.jpg',
        }}
      />
    </View>
  );
};

export default ChatPersonal;