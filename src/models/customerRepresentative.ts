import {Customer} from "./customer";
import {Order} from "./order";
import {Employee} from "./employee";

export interface CustomerRepresentative {
  id?: number;
  firstName?: string;
  lastName?: string;
  customerClass?: string;
  creditLimit?: number;
  creditUsed?: number;
  company?: Customer;
  orderHistory?: Array<Order>;
  favouritedBy?: Array<Employee>;

}