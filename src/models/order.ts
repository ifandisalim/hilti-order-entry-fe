import {CustomerRepresentative} from "./customerRepresentative";
import {Employee} from "./employee";
import {OrderItem} from "./orderItem";

export interface Order {
  id?: number;
  buyer?: CustomerRepresentative;
  handler?: Employee;
  items?: Array<OrderItem>;
  totalPrice?: number;
  dateOrdered?: string;
  datePaid?: string;
  isPaid?: boolean
}