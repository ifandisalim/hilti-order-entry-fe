import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClientModule} from "@angular/common/http";
import { EmployeeProvider } from '../providers/employee/employee';
import { CustomerProvider } from '../providers/customer/customer';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { OrderProvider } from '../providers/order/order';
import {InMemoryCache} from "apollo-cache-inmemory";
import {Apollo, ApolloModule} from "apollo-angular";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {IonicStorageModule} from "@ionic/storage";
import {LocalStorageHelper} from "../helpers/localStorageHelper";
import {NgRedux, NgReduxModule} from "@angular-redux/store";
import {IAppState, INITIAL_STATE, rootReducer} from "./store";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    IonicStorageModule.forRoot(),
    NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
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

  constructor(apollo: Apollo, httpLink: HttpLink, ngRedux: NgRedux<IAppState>) {

    /**
     * Set up apollo, to communicate with GraphQL Server
     */
    apollo.create({
      link: httpLink.create({uri: 'http://localhost:9000/graphql'}),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: { fetchPolicy: 'network-only'},
        watchQuery: { fetchPolicy: 'network-only'}
      }
    });

    /**
     * Set up Redux
     */
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }

}
