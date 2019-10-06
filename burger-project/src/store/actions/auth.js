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
        authData
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
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

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:${requestType}?key=
        AIzaSyCYrbTz_g9DatpuBitjcmgM-z7G2F_FHlQ`; 

        axios.post(
            url,
            authData
        ).then(response => {
            dispatch(authSuccess(response.data))
        }).catch(error => {
            console.log(error);
            dispatch(authFail());
        })
    }
}