const initialState = {
  errorMessage: '',
  isLoading: false,
  isLogin: false,
  isError: false,
  email: '',
}

const auth = (state=initialState, action) => {
  switch(action.type){
    case 'REGISTER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'REGISTER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: 'failed!',
      }
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
      }
    }
    case 'LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: 'failed',
      }
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        email: action.payload.user._user.email,
        isLogin: true
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        isError: false,
        email: ''
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default auth