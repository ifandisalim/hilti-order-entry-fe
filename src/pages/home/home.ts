import { Component } from '@angular/core';
import {Employee} from "../../models/employee";
import {Store} from "@ngrx/store";
import {AppState} from "../../states/app.state";
import {Observable} from "rxjs/Observable";
import {EmployeeLogin, EmployeeLogout} from "../../states/employee/employee.actions";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private loggedInEmployee: Observable<Employee>;

  constructor(private store: Store<AppState>) {
    // Alternatively can have loggedInEmployee as Employee, and just subscribe select().subscribe()
    // Advantage of Observable<Employee> is can use |async in template
    this.loggedInEmployee = this.store.select('loggedInEmployee');
  }

  ionViewDidEnter() {
    this.loggedInEmployee.subscribe(employee => {
      console.log("logged in employee change");
      console.log(employee)
    });

    this.store.dispatch(new EmployeeLogin({
      id: 1,
      firstName: "ifandi",
      lastName: "salim"
    }));

    this.store.dispatch(new EmployeeLogout());
  }


}
