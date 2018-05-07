import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {CustomerPage} from "../customer/customer";
import {CustomerProvider} from "../../providers/customer/customer";
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {Store} from "@ngrx/store";
import {AppState} from "../../states/app.state";
import {ClearCart} from "../../states/order/order.actions";
import {ClearCurrentActiveCustomer} from "../../states/currentActiveCustomer/activeCustomer.actions";
import {CustomerHelper} from "../../helpers/customerHelper";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  customersByInitial = null;
  customerInitials = null;

  constructor(public navCtrl: NavController,
              private customerHelper: CustomerHelper,
              private customerService: CustomerProvider,
              private store: Store<AppState>) {

  }

  ionViewWillEnter() {
    this.customerService.getAllCustomerRepresentative()
      .subscribe(customerRepresentatives =>{
        this.customersByInitial = this.customerHelper.groupCustomersByInitial(customerRepresentatives);
        this.customerInitials = Object.keys(this.customersByInitial).sort();
      });


    console.log("Clearning states");
    this.store.dispatch(new ClearCart());
    this.store.dispatch(new ClearCurrentActiveCustomer());
  }

  registerCustomer() {
    this.navCtrl.push(RegisterPage);
  }

  viewCustomerProfile(customerId: number) {
    this.navCtrl.push(CustomerPage, {id: customerId});
  }



}
