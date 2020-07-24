import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import Geolocation from '@react-native-community/geolocation';

const createUser = (email, username)=>{
  return {
    type: 'CREATEUSER',
    payload: firestore()
    .collection('users')
    .doc(email)
    .set({
      username: username,
      fullname: '-',
      bio: '-',
      image: 'ava.jpg'
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
const editUser = (email, name, bio, username, imageName)=>{
  return {
    type: 'CREATEUSER',
    payload: firestore()
    .collection('users')
    .doc(email)
    .update({
      fullname: name,
      username: username,
      bio: bio,
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


export {createUser, getUser, editUser, uploadImage, sendLocation}