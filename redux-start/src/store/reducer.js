const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }
            break;
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            }
            break;
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.value
            }
            break;
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.value
            }
            break;
        default:
            return { ...state }
    }
}

export default reducer;