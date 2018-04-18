import {Employee} from "../models/employee";
import {EMPLOYEE_LOGIN, EMPLOYEE_LOGOUT} from "./reduxActions";

export interface AppState{
  loggedInEmployee: Employee;
}

export const INITIAL_STATE: AppState = {
  loggedInEmployee: null
};

export const rootReducer = (state: AppState, action): AppState => {

  switch (action.type) {
    case EMPLOYEE_LOGIN :
      console.log("emmployee login");
      return Object.assign({}, state, {loggedInEmployee: action.payload });

    case EMPLOYEE_LOGOUT:
      console.log("employee logout");
      return Object.assign({}, state, {loggedInEmployee: null });
  }


  return state;
};