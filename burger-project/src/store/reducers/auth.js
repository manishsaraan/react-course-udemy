import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.AUTH_START:
      return updateObject(state,{ error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state,{ error: null, loading: false, token: action.token, userId: action.userId });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { loading: false, error: action.error })
    case action.AUTH_LOGOUT:
      return updateObject(state, { token: null, userId: null })
    default:
      return { ...state }
  }
}

export default authReducer;