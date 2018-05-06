import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProductProvider} from "../../providers/product/product";
import {ProductCategory} from "../../models/productCategory";
import {Store} from "@ngrx/store";
import {AppState} from "../../states/app.state";
import {OrderItem} from "../../models/orderItem";
import {OrderHelper} from "../../helpers/orderHelper";
import {Product} from "../../models/product";
import {CartPage} from "../cart/cart";

/**
 * Generated class for the CategoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {

  shoppingCartItems: OrderItem[] = [];
  categoryDetail: ProductCategory = null;
  parentCategory: ProductCategory = null;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private productService: ProductProvider,
              private orderHelper: OrderHelper,
              private store: Store<AppState>) {

    this.store.select("shoppingCart")
      .subscribe((orderItems: OrderItem[]) => {
        this.shoppingCartItems = orderItems;
      });
  }

  ionViewWillEnter() {
    this.categoryDetail = this.navParams.get("categoryDetail");
    this.parentCategory = this.navParams.get("parentCategory");

    this.productService.getCategoryDetails(this.categoryDetail.id)
      .subscribe(categoryDetail => {
        this.categoryDetail = categoryDetail;
      });


  }

  viewCartsPage() {
    this.navCtrl.push(CartPage);
  }

  addProductToCart(product: Product) {
    this.showAddProductAlert(product);
  }


  showAddProductAlert(product: Product) {
    this.alertCtrl.create({
      title: `Add to cart.`,
      subTitle: `Adding ${product.name} to cart.`,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity to add.'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: (inputValue) => {
            console.log('Adding ' + inputValue.quantity);
            this.orderHelper.addNewCartItem(product, inputValue.quantity);
          }
        }
      ]
    }).present();
  }


}
