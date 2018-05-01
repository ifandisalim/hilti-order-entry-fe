import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Store} from "@ngrx/store";
import {AppState} from "../../states/app.state";
import {EmployeeLogout} from "../../states/employee/employee.actions";
import {RemoveAccessToken} from "../../states/authentication/authentication.actions";
import {LocalStorageHelper} from "../../helpers/localStorageHelper";

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

  constructor(public navCtrl: NavController,
              private store: Store<AppState>,
              private localStorageHelper: LocalStorageHelper) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencePage');
  }

  doLogout() {
    this.localStorageHelper.clearLocalStorage()
      .then(() => {
        this.store.dispatch(new EmployeeLogout());
        this.store.dispatch(new RemoveAccessToken());

        this.tabBarElement.style.display = "none";
        this.navCtrl.setRoot(LoginPage);
      });
  }
}
