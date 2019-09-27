const initialState = {
    counter: 0,
    results: []
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
        case 'STORE_RESULT':
            return {
                ...state,
                results: [...state.results, { id: new Date(), value: state.counter }]
            }
            break;
        default:
            return { ...state }
    }
}

export default reducer;