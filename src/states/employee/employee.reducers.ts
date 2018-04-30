import {Employee} from "../../models/employee";
import {Actions, EMPLOYEE_LOGIN, EMPLOYEE_LOGOUT} from "./employee.actions";



export function employeeReducer(state: Employee = null, action: Actions) {
  switch(action.type) {
    case EMPLOYEE_LOGIN:
      return Object.assign({}, state, action.payload);

    case EMPLOYEE_LOGOUT:
      return null;

    default:
      return state;
  }
}
