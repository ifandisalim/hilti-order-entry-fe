import {Employee} from "../models/employee";
import {OrderItem} from "../models/orderItem";

export interface AppState {
  readonly loggedInEmployee: Employee;
  readonly accessToken: string;
  readonly shoppingCart: OrderItem[]
}