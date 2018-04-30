import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {EmployeeProvider} from '../providers/employee/employee';
import {CustomerProvider} from '../providers/customer/customer';
import {AuthenticationProvider} from '../providers/authentication/authentication';
import {OrderProvider} from '../providers/order/order';
import {InMemoryCache} from "apollo-cache-inmemory";
import {Apollo, ApolloModule} from "apollo-angular";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {IonicStorageModule} from "@ionic/storage";
import {LocalStorageHelper} from "../helpers/localStorageHelper";
import {StoreModule} from "@ngrx/store";
import {employeeReducer} from "../states/employee/employee.reducers";

// Pages
import {ContactPage} from "../pages/contact/contact";
import {TabsPage} from "../pages/tabs/tabs";
import {PreferencePage} from "../pages/preference/preference";
import {FavoritePage} from "../pages/favorite/favorite";
import {NotificationPage} from "../pages/notification/notification";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {CustomerPage} from "../pages/customer/customer";
import {ProductsPage} from "../pages/products/products";
import {authenticationReducer} from "../states/authentication/authentication.reducers";

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    PreferencePage,
    FavoritePage,
    NotificationPage,
    RegisterPage,
    LoginPage,
    CustomerPage,
    ProductsPage

  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      loggedInEmployee: employeeReducer,
      accessToken: authenticationReducer
    }),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TabsPage,
    PreferencePage,
    FavoritePage,
    NotificationPage,
    RegisterPage,
    LoginPage,
    CustomerPage,
    ProductsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmployeeProvider,
    CustomerProvider,
    AuthenticationProvider,
    OrderProvider,
    LocalStorageHelper
  ]
})
export class AppModule {

  constructor(apollo: Apollo, httpLink: HttpLink) {

    /**
     * Set up apollo, to communicate with GraphQL Server
     */
    apollo.create({
      link: httpLink.create({uri: 'http://localhost:9000/graphql'}),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {fetchPolicy: 'network-only'},
        watchQuery: {fetchPolicy: 'network-only'}
      }
    });


  }

}
