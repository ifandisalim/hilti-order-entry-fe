import {Employee} from "../models/employee";
import {EMPLOYEE_LOGIN, EMPLOYEE_LOGOUT} from "./reduxActions";

export interface IAppState{
  loggedInEmployee: Employee;

}

export const INITIAL_STATE: IAppState = {
  loggedInEmployee: null
};

export function rootReducer(state: IAppState, action){

  switch (action.type) {
    case EMPLOYEE_LOGIN :
      return Object.assign({}, state, {loggedInEmployee: action.payload });

    case EMPLOYEE_LOGOUT:
      return Object.assign({}, state, {loggedInEmployee: null });
  }

  return state;
}