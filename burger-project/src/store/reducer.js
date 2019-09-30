import * as actionTypes from './actions';

const intialState = {
    ingredients: null,
    totalPrice: 0
};

const reducer = (state = intialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
        return {}
        break;
        default:
        return {}
    }
}

export default reducer;