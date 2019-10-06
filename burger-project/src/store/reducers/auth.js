import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath : "/"
}

const authReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.AUTH_START:
      return updateObject(state,{ error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state,{ error: null, loading: false, token: action.token, userId: action.userId });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { loading: false, error: action.error })
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { token: null, userId: null })
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.payload })
    default:
      return { ...state }
  }
}

export default authReducer;