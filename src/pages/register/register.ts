import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    tabBarElement: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams) {
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
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
