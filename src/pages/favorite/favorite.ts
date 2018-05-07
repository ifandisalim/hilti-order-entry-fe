import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EmployeeProvider} from "../../providers/employee/employee";
import {ClearCurrentActiveCustomer} from "../../states/currentActiveCustomer/activeCustomer.actions";
import {ClearCart} from "../../states/order/order.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../states/app.state";
import {Employee} from "../../models/employee";
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {CustomerHelper} from "../../helpers/customerHelper";
import {CustomerPage} from "../customer/customer";

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  loggedInEmployee: Employee = null;
  customersByInitial = null;
  customerInitials = null;

  constructor(private navCtrl: NavController,
              private employeeService: EmployeeProvider,
              private customerHelper: CustomerHelper,
              private store: Store<AppState>) {

    this.store.select("loggedInEmployee").subscribe(employee => this.loggedInEmployee = employee);
  }

  ionViewWillEnter() {
    console.log("Clearning states");
    this.store.dispatch(new ClearCart());
    this.store.dispatch(new ClearCurrentActiveCustomer());

    this.employeeService.getFavourites(this.loggedInEmployee.id).subscribe(customers => {

      this.customersByInitial = this.customerHelper.groupCustomersByInitial(customers);
      this.customerInitials = Object.keys(this.customersByInitial).sort();
    });

  }



  viewCustomerProfile(customerId: number) {
    this.navCtrl.push(CustomerPage, {id: customerId});
  }

}
