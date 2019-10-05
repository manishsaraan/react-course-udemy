import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    orders:[],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const updatedOrders = {orders: [...state.orders, { ...action.orderData, id: action.orderId }]};
    const updatedState = {
        loading: false,
        purchased: true,
        ...updatedOrders
    }
    return updateObject(state, updatedState);
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}

const orderReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, {purchased: false})

    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {loading: true})

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {loading: true})

    case actionTypes.FETCH_ORDERS_START:
     return updateObject(state, {loading: true})

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, {loading: false})

    default:
      return { ...state }
  }
}

export default orderReducer;