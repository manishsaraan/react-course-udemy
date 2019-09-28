const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {

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
        case 'DELETE_RESULT':
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