import * as actionTypes from './actions';

const intialState = {
    ingredients: {
        salad: 0, 
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0
};

const reducer = (state = intialState, action) => {
    console.log(action)
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
        return {
         ...state,
         ingredients: {
             ...state.ingredients,
             [action.ingredientName]: state.ingredients[action.ingredientName] + 1
         }
        };
        break;
        case actionTypes.REMOVE_INGREDIENTS:
        return {
         ...state,    
         ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }        
        };
        break;
        default:
        return {...state}
    }
}

export default reducer;