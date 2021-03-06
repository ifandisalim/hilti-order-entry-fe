import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';
import {OrderItem} from "../../models/orderItem";
import {Store} from "@ngrx/store";
import {AppState} from "../../states/app.state";
import {Employee} from "../../models/employee";
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {OrderHelper} from "../../helpers/orderHelper";
import {OrderProvider} from "../../providers/order/order";
import {CustomerPage} from "../customer/customer";
import {ContactPage} from "../contact/contact";
import {GraphicalAuthenticatorPage} from "../graphical-authenticator/graphical-authenticator";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {


  shoppingCartItems: OrderItem[] = [];
  loggedInEmployee: Employee = null;
  currentActiveCustomer: CustomerRepresentative = null;
  totalCartPrice: number = 0;

  constructor(private navCtrl: NavController,
              private store: Store<AppState>,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private orderHelper: OrderHelper,
              private orderService: OrderProvider) {

    this.store.select("loggedInEmployee").subscribe(employee => this.loggedInEmployee = employee);
    this.store.select("currentActiveCustomer").subscribe(currentCustomer => this.currentActiveCustomer = currentCustomer);

    this.store.select("shoppingCart").subscribe((orderItems) => {
      this.shoppingCartItems = orderItems;
      this.totalCartPrice = this.orderHelper.calculateTotalOrderPrice(this.shoppingCartItems);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  viewCartsPage() {
    this.navCtrl.push(CartPage);
  }

  increaseItemQuantity(item: OrderItem) {
    this.orderHelper.increaseCartItemQuantity(item);
  }

  decreaseItemQuantity(item: OrderItem) {
    this.orderHelper.decreaseCartItemQuantity(item);
  }

  removeItem(item: OrderItem) {
    this.orderHelper.removeCartItem(item);
  }



  placeOrder() {
    this.navCtrl.push(GraphicalAuthenticatorPage);

  }

}
