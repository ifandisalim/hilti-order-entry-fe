import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductProvider} from "../../providers/product/product";
import {ProductCategory} from "../../models/productCategory";

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

  categoryDetail: ProductCategory = null;
  parentCategory: ProductCategory = null;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private productService: ProductProvider) {
  }

  ionViewWillEnter() {
    this.categoryDetail = this.navParams.get("categoryDetail");
    this.parentCategory = this.navParams.get("parentCategory");

    this.productService.getCategoryDetails(this.categoryDetail.id)
      .subscribe(categoryDetail => {
        this.categoryDetail = categoryDetail;
        console.log("========Received category detail=========");
        console.log(categoryDetail);
      })
  }

  addProductToCart(productId: number) {
    console.log(`Adding product ${productId} to cart.` );
  }

}
