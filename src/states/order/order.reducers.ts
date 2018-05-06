import {OrderItem} from "../../models/orderItem";
import {
  Actions, ADD_ITEM_TO_CART, CLEAR_CART, DECREASE_ORDER_ITEM_QUANTITY, INCREASE_ORDER_ITEM_QUANTITY,
  REMOVE_ITEM_FROM_CART
} from "./order.actions";


export function orderReducer(state: OrderItem[] = [], action: Actions) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.payload];

    case REMOVE_ITEM_FROM_CART:
      return state.filter(orderItem => orderItem !== action.payload);

    // case INCREASE_ORDER_ITEM_QUANTITY:
    //   return state.map(item => (item === action.payload ? {...item, quantity: item.quantity++} : item));

    // case DECREASE_ORDER_ITEM_QUANTITY:
    //   return state.map(item => item === action.payload ? {...item, quantity: item.quantity--} : item);

    case INCREASE_ORDER_ITEM_QUANTITY:
      return state.map(item => {
        if(item === action.payload) {
          item.quantity++
        }
        return item;
      });


    case DECREASE_ORDER_ITEM_QUANTITY:
      return state.map(item => {
        if(item === action.payload && item.quantity >= 1) {
          item.quantity--
        }
        return item;
      });


    case CLEAR_CART:
      return [];

    default:
      return state;
  }
}
