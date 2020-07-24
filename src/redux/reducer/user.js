const initialState = {
  isLoading: false,
  isLoadingImg: false,
  isLoadingLoc: false,
  isError: false,
  errorMsg: '',
  dataUser: []
}

const user = (state=initialState, action) => {
  switch(action.type){
    case 'CREATEUSER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'CREATEUSER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'failed!',
      }
    }
    case 'CREATEUSER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
      }
    }
    case 'GETUSER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GETUSER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'failed!',
      }
    }
    case 'GETUSER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUser: action.payload._data,
      }
    }
    case 'UPLOADIMAGE_PENDING': {
      return {
        ...state,
        isLoadingImg: true,
        isError: false
      }
    }
    case 'UPLOADIMAGE_REJECTED': {
      return {
        ...state,
        isLoadingImg: false,
        isError: true,
        errorMsg: 'failed!',
      }
    }
    case 'UPLOADIMAGE_FULFILLED': {
      return {
        ...state,
        isLoadingImg: false,
        isError: false,
      }
    }
    case 'LOCATION_PENDING': {
      return {
        ...state,
        isLoadingLoc: true,
        isError: false
      }
    }
    case 'LOCATION_REJECTED': {
      return {
        ...state,
        isLoadingLoc: false,
        isError: true,
        errorMsg: 'failed!',
      }
    }
    case 'LOCATION_FULFILLED': {
      return {
        ...state,
        isLoadingLoc: false,
        isError: false,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        isError: false,
        dataUser: []
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default user