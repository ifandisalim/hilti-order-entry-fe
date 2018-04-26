import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProductsPage} from "../products/products";

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
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    gotoProduct(){
        this.navCtrl.push(ProductsPage);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomerPage');
    }

    // hide the tab-bar when entering
    ionViewWillEnter() {
        this.tabBarElement.style.display = "none";
    }

    // unhide tab-bar when leaving
    ionViewWillLeave() {
        this.tabBarElement.style.display = "flex";
    }

}
