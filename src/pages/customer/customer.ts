import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProductsPage} from "../products/products";
import {CustomerProvider} from "../../providers/customer/customer";
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {Order} from "../../models/order";

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
  orderHistory: Order[] = null;

  // Toggle State
  viewRecentPurchaseList:boolean = true;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private customerService: CustomerProvider) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  gotoProduct() {
    this.navCtrl.push(ProductsPage, {customerRepresentative: this.customerRepresentative});
  }

  // hide the tab-bar when entering
  ionViewWillEnter() {
    this.customerService.getCustomerRepresentative(this.navParams.get("id"))
      .subscribe(customerDetail => {
        this.customerRepresentative = customerDetail;

        this.customerService.getCustomerRepresentativeOrderHistorySummary(this.customerRepresentative.id, 0)
          .subscribe(orders => {
            this.orderHistory = orders;
            console.log(this.orderHistory);
          });
      });
  }

  // Toggle open attribute for parent category
  toggleRecentPurchase() {
    this.viewRecentPurchaseList= !this.viewRecentPurchaseList;
  }

}
