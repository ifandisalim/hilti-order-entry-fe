import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CustomerRepresentative} from "../../models/customerRepresentative";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {map} from "rxjs/operators";
import {Order} from "../../models/order";

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
                  id,
                  firstName,
                  lastName,
                  creditLimit,
                  creditUsed,
                  customerClass
                  company {
                    id,
                    name
                  },
                  favouritedBy{
                    id
                  }
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


  public getAllCustomerRepresentative(): Observable<CustomerRepresentative[]> {
    return this.apollo.watchQuery<any>({
      query: gql`
            query {
                customerRepresentatives {
                  id,
                  firstName,
                  lastName,
                  company{
                    id,
                    name
                  }
              }
            }
        `
    })
      .valueChanges
      .pipe(
        map(result => {
          return result.data.customerRepresentatives;
        })
      );
  }


  public getCustomerRepresentativeOrderHistorySummary(representativeId: number, offset: number): Observable<Order[]> {
    return this.apollo.watchQuery<any>({
      query: gql`
            query {
                customerRepOrderHistory(customerRepresentativeId: ${representativeId}, offset: ${offset}) {
                  id,
                  totalPrice,
                  dateOrdered,
                  datePaid,
                  isPaid,
                  buyer{
                    id,
                  },
                  handler{
                    id,
                    firstName,
                    lastName
                  }
              }
            }
        `
    })
      .valueChanges
      .pipe(
        map(result => {
          return result.data.customerRepOrderHistory;
        })
      );
  }

}
