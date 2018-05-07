import {Injectable} from "@angular/core";
import {CustomerRepresentative} from "../models/customerRepresentative";

@Injectable()
export class CustomerHelper {



  groupCustomersByInitial(customers: CustomerRepresentative[]) {
    return customers.reduce((currentCustomers, customer) => {

      let customerInitial = customer.firstName.toLowerCase()[0];
      currentCustomers[customerInitial] = currentCustomers[customerInitial] || [];
      currentCustomers[customerInitial].push(customer);
      return currentCustomers;
    }, {})
  }
}
