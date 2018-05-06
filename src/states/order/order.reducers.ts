import {OrderItem} from "../../models/orderItem";
import {Actions, ADD_ITEM_TO_CART, CLEAR_CART, REMOVE_ITEM_FROM_CART} from "./order.actions";


export function orderReducer(state: OrderItem[] = [], action: Actions) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.payload];

    case REMOVE_ITEM_FROM_CART:
      return state.filter(orderItem => orderItem !== action.payload);

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
}
