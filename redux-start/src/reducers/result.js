import * as actionTypes from '../actions/actions'

const initialState = {
    results: []
}

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: [...state.results, { id: new Date(), value: action.result }]
            }
            break;
        case actionTypes.DELETE_RESULT:
            const { results } = state;
            const updatedResults = results.filter(item => item.id !== action.id);

            return {
                ...state,
                results: updatedResults
            }
            break;
        default:
            return { ...state }
    }
}

export default resultReducer;