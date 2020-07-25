import auth from '@react-native-firebase/auth'

const register = (email, password)=>{
  return {
    type: 'REGISTER',
    payload: auth().createUserWithEmailAndPassword(email, password)
  }
}
const login = (email, password)=>{
  return {
    type: 'LOGIN',
    payload: auth().signInWithEmailAndPassword(email, password)
  }
}

const logout = ()=>{
  return {
    type: 'LOGOUT',
    payload: ''
  }
}

export {register, login, logout}