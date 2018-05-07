import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProductsPage} from "../products/products";
import {CustomerProvider} from "../../providers/customer/customer";
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {Order} from "../../models/order";
import {Employee} from "../../models/employee";
import {AppState} from "../../states/app.state";
import {Store} from "@ngrx/store";
import {EmployeeProvider} from "../../providers/employee/employee";

/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  tabBarElement: any;
  customerRepresentative: CustomerRepresentative = null;
  loggedInemployee: Employee = null;
  orderHistory: Order[] = null;
  isFavourite: boolean = false;

  // Toggle State
  viewRecentPurchaseList:boolean = true;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private customerService: CustomerProvider,
              private employeeService: EmployeeProvider,
              private store: Store<AppState>) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    this.store.select("loggedInEmployee").subscribe(employee => this.loggedInemployee = employee);
  }

  gotoProduct() {
    this.navCtrl.push(ProductsPage, {customerRepresentative: this.customerRepresentative});
  }

  // hide the tab-bar when entering
  ionViewWillEnter() {
    this.customerService.getCustomerRepresentative(this.navParams.get("id"))
      .subscribe(customerDetail => {
        this.customerRepresentative = customerDetail;
        this.checkIsFavourite();

        this.customerService.getCustomerRepresentativeOrderHistorySummary(this.customerRepresentative.id, 0)
          .subscribe(orders => {
            this.orderHistory = orders;
          });
      });
  }

  // Toggle open attribute for parent category
  toggleRecentPurchase() {
    this.viewRecentPurchaseList= !this.viewRecentPurchaseList;
  }

  addToFavourite(customerId: number) {
    this.employeeService.addFavourite(this.loggedInemployee.id, customerId)
      .subscribe(() => {
        this.isFavourite = true;
      })
  }

  removeFromFavourite(customerId: number) {
    this.employeeService.removeFavourite(this.loggedInemployee.id, customerId)
      .subscribe(() => {
        this.isFavourite = false;
      })
  }

  checkIsFavourite() {
    this.customerRepresentative.favouritedBy.forEach(employee => {
      if (employee.id === this.loggedInemployee.id) {
        this.isFavourite = true;
        return;
      }
    })
  }

}
