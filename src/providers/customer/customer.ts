import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {map} from "rxjs/operators";

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerProvider {

  constructor(private http: HttpClient,
              private apollo: Apollo) {
  }



  public getCustomerRepresentative(representativeId: number): Observable<CustomerRepresentative> {
    return this.apollo.watchQuery<any>({
      query: gql`
            query {
                customerRepresentative(id: ${representativeId}) {
                  id
              }
            }
        `
    })
      .valueChanges
      .pipe(
        map(result => {
          return result.data.customerRepresentative;
        })
      );
  }

}
