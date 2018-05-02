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

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private customerService: CustomerProvider) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  gotoProduct() {
    this.navCtrl.push(ProductsPage);
  }

  // hide the tab-bar when entering
  ionViewWillEnter() {
    this.tabBarElement.style.display = "none";


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

  // unhide tab-bar when leaving
  ionViewWillLeave() {
    this.tabBarElement.style.display = "flex";
  }

}
