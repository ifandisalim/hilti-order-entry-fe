import {Actions, CLEAR_CURRENT_ACTIVE_CUSTOMER, SET_CURRENT_ACTIVE_CUSTOMER} from "./activeCustomer.actions";
import {CustomerRepresentative} from "../../models/customerRepresentative";


export function activeCustomerReducer(state: CustomerRepresentative = null, action: Actions) {
  switch (action.type) {
    case SET_CURRENT_ACTIVE_CUSTOMER:
      return Object.assign({}, state, action.payload);

    case CLEAR_CURRENT_ACTIVE_CUSTOMER:
      return null;

    default:
      return state;
  }
}
