import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Employee} from "../../models/employee";
import {Credential} from "../../models/credential";
import constants from "../../app/constants";

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(private http: HttpClient) {
  }

  /**
   * Method to authenticate user against the backend
   * When success, will return the user details from backend.
   */
  public authenticate(username:string, password:string): Observable<HttpResponse<Employee>> {

    let credential: Credential = {
      username,
      password
    };

    return this.http.post<Employee>(`${constants.HOST_NAME}/login`, credential, {
      observe: 'response'
    });
  }

}
