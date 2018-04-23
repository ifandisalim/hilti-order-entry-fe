import { Component } from '@angular/core';
import {NgRedux} from "@angular-redux/store";
import {EMPLOYEE_LOGIN, EMPLOYEE_LOGOUT} from "../../app/reduxActions";
import {IAppState} from "../../app/store";
import {Employee} from "../../models/employee";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private loggedInEmployee: Employee;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ionViewDidEnter() {

    this.ngRedux.select(state => state.loggedInEmployee)
      .subscribe(loggedInEmployee => {
        console.log("Redux logged in employee changed");
        this.loggedInEmployee = loggedInEmployee;
        console.log(this.loggedInEmployee);
      });

    // this.ngRedux.dispatch({
    //   type: EMPLOYEE_LOGIN,
    //   payload: {
    //     id: 1,
    //     firstName: 'Ifandi',
    //     lastName: 'last'
    //   }
    // });


    this.ngRedux.dispatch({
      type: EMPLOYEE_LOGOUT
    });

  }
  

}
