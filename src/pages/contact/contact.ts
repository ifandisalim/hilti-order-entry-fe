import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {CustomerPage} from "../customer/customer";
import {CustomerProvider} from "../../providers/customer/customer";
import {CustomerRepresentative} from "../../models/customerRepresentative";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  customersByInitial = null;
  customerInitials = null;

  constructor(public navCtrl: NavController,
              private customerService: CustomerProvider) {

  }

  ionViewWillEnter() {
    this.customerService.getAllCustomerRepresentative()
      .subscribe(customerRepresentatives =>{
        this.customersByInitial = ContactPage.groupCustomersByInitial(customerRepresentatives);
        this.customerInitials = Object.keys(this.customersByInitial).sort();

        console.log(this.customersByInitial);
        console.log(this.customerInitials);
      });
  }

  registerCustomer() {
    this.navCtrl.push(RegisterPage);
    console.log("here");
  }

  custProfile() {
    this.navCtrl.push(CustomerPage);
  }

  static groupCustomersByInitial(customers: CustomerRepresentative[]) {
    return customers.reduce((currentCustomers, customer) => {

      let customerInitial = customer.firstName.toLowerCase()[0];
      currentCustomers[customerInitial] = currentCustomers[customerInitial] || [];
      currentCustomers[customerInitial].push(customer);
      return currentCustomers;
    }, {})
  }

}
