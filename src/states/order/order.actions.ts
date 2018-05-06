import {Action} from "@ngrx/store";
import {OrderItem} from "../../models/orderItem";
import {CustomerRepresentative} from "../../models/customerRepresentative";

export const ADD_ITEM_TO_CART = '[ORDER] ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = '[ORDER] REMOVE_ITEM_FROM_CART';
export const DECREASE_ORDER_ITEM_QUANTITY = '[ORDER] DECREASE_ORDER_ITEM_QUANTITY';
export const INCREASE_ORDER_ITEM_QUANTITY = '[ORDER] INCREASE_ORDER_ITEM_QUANTITY';
export const CLEAR_CART = '[ORDER] CLEAR_CART';

export class AddItemToCart implements Action {
  readonly type = ADD_ITEM_TO_CART;
  constructor(public payload: OrderItem) {}
}

export class IncreaseItemQuantity implements Action {
  readonly type = INCREASE_ORDER_ITEM_QUANTITY;
  constructor(public payload: OrderItem) {}
}

export class DecreaseItemQuantity implements Action {
  readonly type = DECREASE_ORDER_ITEM_QUANTITY;
  constructor(public payload: OrderItem) {}
}

export class RemoveItemFromCart implements Action {
  readonly type = REMOVE_ITEM_FROM_CART;
  constructor(public payload: OrderItem) {}
}

export class ClearCart implements Action {
  readonly type = CLEAR_CART;
}


export type Actions = AddItemToCart | RemoveItemFromCart | ClearCart | IncreaseItemQuantity | DecreaseItemQuantity

