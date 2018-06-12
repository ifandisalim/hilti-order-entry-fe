import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {EmployeeProvider} from '../providers/employee/employee';
import {CustomerProvider} from '../providers/customer/customer';
import {AuthenticationProvider} from '../providers/authentication/authentication';
import {OrderProvider} from '../providers/order/order';
import {InMemoryCache} from "apollo-cache-inmemory";
import {Apollo, ApolloModule} from "apollo-angular";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {IonicStorageModule} from "@ionic/storage";
import {LocalStorageHelper} from "../helpers/localStorageHelper";
import {Store, StoreModule} from "@ngrx/store";
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
import {AppState} from "../states/app.state";
import {ApolloLink, concat} from "apollo-link";
import { ProductProvider } from '../providers/product/product';
import {orderReducer} from "../states/order/order.reducers";
import {CategoryDetailPage} from "../pages/category-detail/category-detail";
import {CartPage} from "../pages/cart/cart";
import {OrderHelper} from "../helpers/orderHelper";
import {activeCustomerReducer} from "../states/currentActiveCustomer/activeCustomer.reducers";
import {CustomerHelper} from "../helpers/customerHelper";
import {CompetitorDetailsPage} from "../pages/competitor-details/competitor-details";
import {ProductHelper} from "../helpers/productHelper";
import constants from "./constants";
import {GraphicalAuthenticatorPage} from "../pages/graphical-authenticator/graphical-authenticator";

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
    ProductsPage,
    CategoryDetailPage,
    CompetitorDetailsPage,
    CartPage,
    GraphicalAuthenticatorPage

  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      loggedInEmployee: employeeReducer,
      currentActiveCustomer: activeCustomerReducer,
      accessToken: authenticationReducer,
      shoppingCart: orderReducer
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
    ProductsPage,
    CategoryDetailPage,
    CompetitorDetailsPage,
    CartPage,
    GraphicalAuthenticatorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmployeeProvider,
    CustomerProvider,
    AuthenticationProvider,
    OrderProvider,
    LocalStorageHelper,
    OrderHelper,
    CustomerHelper,
    ProductHelper,
    ProductProvider
  ]
})
export class AppModule {

  accessToken: string = null;

  constructor(apollo: Apollo,
              httpLink: HttpLink,
              private store: Store<AppState>,
              private localStorageHelper: LocalStorageHelper) {


    this.localStorageHelper.getAccessToken().then(token => {
      this.accessToken = token;

      /**
       * Set up apollo, to communicate with GraphQL Server
       * Set up inside getAccessToken() promise
       */
      apollo.create({
        link: concat(authorizationMiddleware, http),
        cache: new InMemoryCache(),
        // defaultOptions: {
        //   query: {fetchPolicy: 'network-only'},
        //   watchQuery: {fetchPolicy: 'network-only'}
        // }
      });
  });

    // Link to GraphQL Server
    const http = httpLink.create({ uri: `${constants.HOST_NAME}/graphql` });

    // Apollo middleware to add Authorization header to each request
    const authorizationMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', this.accessToken)
      });

      return forward(operation);
    });


    // Ng Store to update access token whenever its changed
    this.store.select('accessToken').subscribe(token => {
      this.accessToken = token;
    });
}


}
