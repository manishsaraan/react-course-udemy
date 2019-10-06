import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
      setTimeout(() => {
          dispatch(logout())
      }, expTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        const requestType = isSignup ? "signUp" : "signInWithPassword";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:${requestType}?key=${process.env.REACT_APP_FIREBASE_KEY}
        `; 

        axios.post(
            url,
            authData
        ).then(response => {
            dispatch(authSuccess(response.data))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }).catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const setAuthRedirect = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: path
    }
}