import {Action} from "@ngrx/store";
import {OrderItem} from "../../models/orderItem";
import {CustomerRepresentative} from "../../models/customerRepresentative";

export const SET_CURRENT_ACTIVE_CUSTOMER = '[ACTIVE_CUSTOMER] SET_CURRENT_ACTIVE_CUSTOMER';
export const CLEAR_CURRENT_ACTIVE_CUSTOMER = '[ACTIVE_CUSTOMER] CLEAR_CURRENT_ACTIVE_CUSTOMER';

export class SetCurrentActiveCustomer implements Action {
  readonly type = SET_CURRENT_ACTIVE_CUSTOMER;
  constructor(public payload: CustomerRepresentative) {}
}

export class ClearCurrentActiveCustomer implements Action {
  readonly type = CLEAR_CURRENT_ACTIVE_CUSTOMER;
}

export type Actions = SetCurrentActiveCustomer | ClearCurrentActiveCustomer

