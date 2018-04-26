import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";

/**
 * Generated class for the PreferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-preference',
    templateUrl: 'preference.html',
})
export class PreferencePage {
    tabBarElement: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PreferencePage');
    }

    doLogout() {
        this.tabBarElement.style.display = "none";
        this.navCtrl.setRoot(LoginPage);
    }
}
