 import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {AuthenticationProvider} from "../../providers/authentication/authentication";
 import {Employee} from "../../models/employee";
 import {LocalStorageHelper} from "../../helpers/localStorageHelper";
 import {TabsPage} from "../tabs/tabs";
 import {Store} from "@ngrx/store";
 import {AppState} from "../../states/app.state";
 import {EmployeeLogin} from "../../states/employee/employee.actions";
 import {SetAccessToken} from "../../states/authentication/authentication.actions";
 import constants from "../../app/constants";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = "";
  password: string = "";
  isLoggingIn: boolean = false;
  submitErrorMsg: string = "";


  constructor(private navCtrl: NavController,
              private toastCtrl: ToastController,
              private authService: AuthenticationProvider,
              private localStorageHelper: LocalStorageHelper,
              private store: Store<AppState>) {

  }


  doLogin(loginForm) {
    this.isLoggingIn = true;

    this.authService.authenticate(loginForm.value.username, loginForm.value.password)
      .subscribe(res => {
        this.isLoggingIn = false;
        let loggedInEmployee: Employee = res.body;
        let accessToken: string = res.headers.get(constants.HEADER_AUTHORIZATION);

        this.store.dispatch(new EmployeeLogin(loggedInEmployee));
        this.store.dispatch(new SetAccessToken(accessToken));

        this.localStorageHelper.setLoggedInEmployee(loggedInEmployee)
          .then(() => {
            this.localStorageHelper.setAccessToken(accessToken)
              .then(() => {
                console.log("Done setting access token");
                this.showToast("Welcome back " + loggedInEmployee.firstName);
                this.navCtrl.setRoot(TabsPage);
              })
          });

      }, submitErr => {
        this.isLoggingIn = false;
        this.renderFailedLoginMsg(submitErr.error.type);
      });


  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'bottom'
    }).present();
  }

  renderFailedLoginMsg(errorType: string) {

    if(errorType === 'not_found_exception') {
      this.submitErrorMsg = constants.USER_NOT_FOUND;
      return;
    }

    if(errorType === 'authentication_exception') {
      this.submitErrorMsg = constants.WRONG_CREDENTIALS;
      return;
    }

    if(errorType === 'Validation Error') {
      this.submitErrorMsg = constants.WRONG_CREDENTIALS;
      return;
    }

    this.submitErrorMsg = constants.UNEXPECTED_LOGIN_FAILURE;
  }

}
