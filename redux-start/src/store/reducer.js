import * as actionTypes from '../actions/actions'

const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }
            break;
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
            break;
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
            break;
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }
            break;
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: [...state.results, { id: new Date(), value: state.counter }]
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

export default reducer;