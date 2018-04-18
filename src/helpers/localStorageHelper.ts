import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Employee} from "../models/employee";
import constants from "../app/constants";


@Injectable()
export class LocalStorageHelper {

  constructor(private storage:Storage ) {
  }

  /**
   * Set logged in employee details in local storage.
   * @param {Employee} employee
   * @returns {Promise<any>}
   */
  public setLoggedInEmployee(employee: Employee): Promise<any> {
    return this.storage.ready()
      .then(() => {
        this.storage.set(constants.LOGGED_IN_EMPLOYEE, employee);
      });
  }


  /**
   * Get logged in employee details from local storage.
   * @returns {Promise<Employee>}
   */
  public getLoggedInEmployee(): Promise<Employee> {
    return this.storage.ready()
      .then(() => {
        return this.storage.get(constants.LOGGED_IN_EMPLOYEE)
          .then(loggedInEmployee => {
            if(loggedInEmployee === null) {
              console.log("LocalStorageHelper: loggedInEmployee is null in Local Storage");
              return null;
            }

            return loggedInEmployee;
          });
      })
  }


  /**
   * Clear content of local storage
   * @returns {Promise<any>}
   */
  public clearLocalStorage(): Promise<any> {
    return this.storage.clear();
  }


}