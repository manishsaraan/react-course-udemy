import * as actionTypes from '../actions/actions'

const initialState = {
    counter: 0
}

const counterReducer = (state = initialState, action) => {

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
        default:
            return { ...state }
    }
}

export default counterReducer;