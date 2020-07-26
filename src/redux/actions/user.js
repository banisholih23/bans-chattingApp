import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import Geolocation from '@react-native-community/geolocation';

const addUser = (email, username)=>{
  return {
    type: 'CREATEUSER',
    payload: firestore()
    .collection('users')
    .doc(email)
    .set({
      username: username,
      fullname: '-',
      bio: '-',
      image: 'image.jpg',
      status: '-',
      location: {
        latitude: 0,
        longitude: 0
      }
    })
  }
}
const getUser = (email)=>{
  return {
    type: 'GETUSER',
    payload: firestore()
    .collection('users')
    .doc(email)
    .get()
  }
}
const patchUser = (email, name, bio, username, imageName, status)=>{
  return {
    type: 'CREATEUSER',
    payload: firestore()
    .collection('users')
    .doc(email)
    .update({
      fullname: name,
      username: username,
      bio: bio,
      status: status,
      image: imageName
    })
  }
}

const uploadImage = (imageName, image)=>{
  return {
    type: 'UPLOADIMAGE',
    payload: storage()
    .ref('/' + imageName)
    .putFile(image)
  }
}

const sendLocation = (email, latitude, longitude)=>{
  return {
    type: 'LOCATION',
    payload: firestore()
    .collection('users')
    .doc(email)
    .set({
      location: {
        latitude: latitude,
        longitude: longitude
      }
    })
  }
}

const friends = (request) => ({
  type: 'FRIENDS',
  payload: request,
});


export {addUser, getUser, patchUser, uploadImage, sendLocation, friends}