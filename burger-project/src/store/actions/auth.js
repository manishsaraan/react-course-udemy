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
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
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
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000 )
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
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

export const authCheckStatus = () => {
    return dispatch => {
      const token = localStorage.getItem("token");
      if(!token){
          dispatch(logout());
      }else{
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if(expirationDate > new Date()){
            dispatch(logout());
        }else{
            const userId = localStorage.getItem("userId");

            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()))
        }
      }
    };
}