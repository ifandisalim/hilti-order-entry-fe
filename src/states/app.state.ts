import {Employee} from "../models/employee";
import {OrderItem} from "../models/orderItem";
import {CustomerRepresentative} from "../models/customerRepresentative";

export interface AppState {
  readonly loggedInEmployee: Employee;
  readonly currentActiveCustomer: CustomerRepresentative;
  readonly accessToken: string;
  readonly shoppingCart: OrderItem[]
}