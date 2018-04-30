import {Employee} from "../../models/employee";
import {Actions, REMOVE_ACCESS_TOKEN, SET_ACCESS_TOKEN} from "./authentication.actions";



export function authenticationReducer(state: Employee = null, action: Actions) {
  switch(action.type) {
    case SET_ACCESS_TOKEN:
      return action.payload;

    case REMOVE_ACCESS_TOKEN:
      return null;

    default:
      return state;
  }
}
