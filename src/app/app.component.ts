import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {LocalStorageHelper} from "../helpers/localStorageHelper";
import {Store} from "@ngrx/store";
import {AppState} from "../states/app.state";
import {EmployeeLogin} from "../states/employee/employee.actions";
import {SetAccessToken} from "../states/authentication/authentication.actions";
import {TabsPage} from "../pages/tabs/tabs";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private localStorageHelper: LocalStorageHelper,
              private store: Store<AppState>
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.localStorageHelper.getLoggedInEmployee()
        .then(loggedInEmployee => {
          if(loggedInEmployee == null) {
            console.log("app.component.ts: null loggedInEmployee in local storage");
            return;
          }

          this.store.dispatch(new EmployeeLogin(loggedInEmployee));

          this.localStorageHelper.getAccessToken()
            .then(accessToken => {

              if(accessToken == null) {
                console.log("app.component.ts: null accessToken in local storage");
                return;
              }

              this.store.dispatch(new SetAccessToken(accessToken));
              this.nav.setRoot(TabsPage);
            })
        });
    });
  }
}

