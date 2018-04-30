import {Employee} from "../models/employee";

export interface AppState {
  readonly loggedInEmployee: Employee;
  readonly accessToken: string;
}