import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {Observable} from "rxjs/Observable";
import gql from "graphql-tag";
import {map} from "rxjs/operators";
import {Apollo} from "apollo-angular";
import constants from "../../app/constants";
import {RequestOptions} from "@angular/http";

/*
  Generated class for the EmployeeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmployeeProvider {

  constructor(private http: HttpClient,
              private apollo: Apollo) {
  }

  getFavourites(employeeId: number): Observable<CustomerRepresentative[]> {
    return this.apollo.watchQuery<any>({
      query: gql`
            query {
                employee(id: ${employeeId}){
                  favourites {
                    id,
                    firstName,
                    lastName,
                    company{
                      id,
                      name
                    }
                  }
              }
            }
        `
    })
      .valueChanges
      .pipe(
        map(result => {
          return result.data.employee.favourites;
        })
      );
  }

  addFavourite(employeeId: number, customerRepresentativeId: number): Observable<any> {
    console.log("Employee id:" + employeeId);
    console.log("Customer id: " + customerRepresentativeId);
    return this.http.post(`${constants.HOST_NAME}/employee/${employeeId}/favourites`, {
      favourites: [
        {
          id: customerRepresentativeId
        }
      ]
    });
  }

  removeFavourite(employeeId: number, customerRepresentativeId: number){

    let requestObj = {
      favourites: [
        {
          id: customerRepresentativeId
        }
      ]
    };

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: requestObj,
    };

    return this.http.delete(`${constants.HOST_NAME}/employee/${employeeId}/favourites`, options);
  }


}
