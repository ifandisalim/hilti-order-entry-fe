import {Action} from "@ngrx/store";
import {Employee} from "../../models/employee";

export const EMPLOYEE_LOGIN = '[EMPLOYEE] LOGIN';
export const EMPLOYEE_LOGOUT = '[EMPLOYEE] LOGOUT';

export class EmployeeLogin implements Action {
  readonly type = EMPLOYEE_LOGIN;

  constructor(public payload: Employee) {}
}

// Not passing any data so no need constructor
export class EmployeeLogout implements Action {
  readonly type = EMPLOYEE_LOGOUT;

}

export type Actions = EmployeeLogin | EmployeeLogout

