import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };
  
const intialState = {
    ingredients: null,
    error: false,
    totalPrice: 4
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
    }

    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => { 
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedStateValue = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building: true
    }

    return updateObject(state, updatedStateValue);
}

const setIngredient = (state, action) => {
    return updateObject(
        state,
        {
           ingredients: {
              salad:  action.ingredients.salad,
              bacon:  action.ingredients.bacon,
              cheese:  action.ingredients.cheese,
              meat:  action.ingredients.meat
      },
      totalPrice: 4,
      error: false,
      building: false
      }
        
  )
}

const reducer = (state = intialState, action) => {

    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
          return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENTS:
          return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENTS:
          return setIngredient(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED:
          return updateObject(state, { error: true })

        default:
        return {...state}
    }
}

export default reducer;