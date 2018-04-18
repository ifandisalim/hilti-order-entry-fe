import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocalStorageHelper} from "../../helpers/localStorageHelper";
import {log} from "async";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private localStorageHelper: LocalStorageHelper) {}

  ionViewDidEnter() {
    console.log("Test local storage");
    this.localStorageHelper.setLoggedInEmployee({
      id: 1,
      firstName: 'test',
      lastName: 'test'
    })
      .then(res => {
        console.log("done setting local storage");
        console.log(res);
      });


    this.localStorageHelper.getLoggedInEmployee()
      .then(loggedInEmployee => {
        console.log("Done getting logged in employee");
        console.log(loggedInEmployee)
      });
  }

}
