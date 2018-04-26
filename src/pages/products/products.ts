import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-products',
    templateUrl: 'products.html',
})
export class ProductsPage {
    tabBarElement: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductsPage');
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
