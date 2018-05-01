import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {CustomerPage} from "../customer/customer";
import {CustomerProvider} from "../../providers/customer/customer";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
              private customerService: CustomerProvider) {

  }

  ionViewWillEnter() {
    this.customerService.getAllCustomerRepresentative()
      .subscribe(customerRepresentatives => {
        console.log("Contact.ts: received customer representative");
        console.log(customerRepresentatives);
      });
  }

  registerCustomer() {
    this.navCtrl.push(RegisterPage);
    console.log("here");
  }

  custProfile() {
    this.navCtrl.push(CustomerPage);
  }

}
