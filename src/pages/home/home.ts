import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocalStorageHelper} from "../../helpers/localStorageHelper";
import {log} from "async";
import {CustomerProvider} from "../../providers/customer/customer";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private localStorageHelper: LocalStorageHelper,
              private customerProvider: CustomerProvider) {}

  ionViewDidEnter() {
    this.customerProvider.getCustomerRepresentative(1)
      .subscribe(res => {
        console.log('done getting customer rep');
        console.log(res);
      })
  }

}
