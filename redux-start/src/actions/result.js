
import * as actionTypes from './actionTypes';

const saveResult = res => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    }
}

export const storeResult = (payload) => {
    return (dispatch, getState) => {
        console.log(getState().counter.counter)
        setTimeout(() => {
            dispatch(saveResult(payload))
        }, 2000);
    }


    
}

export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        id
    }
}