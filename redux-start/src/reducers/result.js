import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
}

const deleteResult = (state, action) => {
    const { results } = state;
    const updatedResults = results.filter(item => item.id !== action.id);

    return updateObject(state, {results: updatedResults});
}

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {results: [...state.results, { id: new Date(), value: action.result }]})
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
        default:
            return { ...state }
    }
}

export default resultReducer;