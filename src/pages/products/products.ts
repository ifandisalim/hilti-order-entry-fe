import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {ProductProvider} from "../../providers/product/product";
import {ProductCategory} from "../../models/productCategory";
import {CategoryDetailPage} from "../category-detail/category-detail";
import {CartPage} from "../cart/cart";
import {OrderItem} from "../../models/orderItem";
import {Store} from "@ngrx/store";
import {AppState} from "../../states/app.state";
import {SetCurrentActiveCustomer} from "../../states/currentActiveCustomer/activeCustomer.actions";

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  shoppingCartItems: OrderItem[] = [];
  tabBarElement: any;
  customerRepresentative: CustomerRepresentative = null;
  categoriesWithProducts: {} = null;
  parentCategoryNames = null;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private productService: ProductProvider,
              private store: Store<AppState>) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.store.select("shoppingCart").subscribe((orderItems) => this.shoppingCartItems = orderItems);
  }


  // hide the tab-bar when entering
  ionViewWillEnter() {
    this.customerRepresentative = this.navParams.get("customerRepresentative");
    this.store.dispatch(new SetCurrentActiveCustomer(this.customerRepresentative));


    // Get Product Summary
    this.productService.getCategoriesSummary()
      .subscribe(categories => {
        this.categoriesWithProducts = this.groupProductsByParent(categories);
        this.parentCategoryNames = Object.keys(this.categoriesWithProducts);
      });

  }


  groupProductsByParent(categories: ProductCategory[]) {
    return categories.reduce((currentCategories, category) => {

      if (category.isMaster) {
        let categoryName = category.name;
        currentCategories[categoryName] = JSON.parse(JSON.stringify(category));
      }

      return currentCategories;
    }, {})
  }


  viewCartsPage() {
    this.navCtrl.push(CartPage);
  }


  viewDetailedCategoryPage(parentCategory: ProductCategory, category: ProductCategory) {
    this.navCtrl.push(CategoryDetailPage, {parentCategory, categoryDetail: category});
  }

  // Toggle open attribute for parent category
  toggleParentCategory(categoryKey: string) {
    this.categoriesWithProducts[categoryKey].open = !this.categoriesWithProducts[categoryKey].open;
  }

}
