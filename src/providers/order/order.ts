import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {OrderItem} from "../../models/orderItem";
import constants from "../../app/constants";
import {Employee} from "../../models/employee";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OrderProvider Provider');
  }

  placeOrder(buyerId: number, handlerId: number, orderItems: OrderItem[]): Observable<number> {

    let requestObj = {
      buyer: {id: buyerId},
      handler: {id: handlerId},
      items: orderItems
    };

    return this.http.post<number>(`${constants.HOST_NAME}/order`, requestObj);
  }

}
