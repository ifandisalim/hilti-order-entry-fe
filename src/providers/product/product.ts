import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {map} from "rxjs/operators";
import gql from "graphql-tag";
import {Observable} from "rxjs/Observable";
import {ProductCategory} from "../../models/productCategory";
import {Product} from "../../models/product";

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  constructor(private http: HttpClient,
              private apollo: Apollo) {
    console.log('Hello ProductProvider Provider');
  }

  public getCategoriesSummary(): Observable<ProductCategory[]> {
    return this.apollo.watchQuery<any>({
      query: gql`
            query {
                categories {
                  id,
                  name,
                  imageUrl,
                  isMaster,
                  childCategories {
                    id,
                    name,
                    imageUrl
                  },
              }
            }
        `
    })
      .valueChanges
      .pipe(
        map(result => {
          return result.data.categories;
        })
      );
  }


  public getCategoryDetails(categoryId: number): Observable<ProductCategory> {
    return this.apollo.watchQuery<any>({
      query: gql`
            query {
                category(id:${categoryId}) {
                  id,
                  name,
                  imageUrl,
                  description,
                  products {
                    id,
                    name,
                    imageUrl,
                    description,
                    price
                  }
              }
            }
        `
    })
      .valueChanges
      .pipe(
        map(result => {
          return result.data.category;
        })
      );
  }


  public getCompetitorDetails(categoryId: number): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
            query {
                category(id:${categoryId}) {
                  id,
                  name,
                  competingProducts {
                    id,
                    name,
                    imageUrl,
                    description,
                    price,
                    features,
                    technicalData
                  }
              }
            }
        `
    })
      .valueChanges
      .pipe(
        map(result => {
          return result.data.category.competingProducts;
        })
      );
  }


  public getProductDetails(productId: number): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
            query {
                product(id:${productId}) {
                  id,
                  name,
                  imageUrl,
                  description,
                  price,
                  features,
                  technicalData
              }
            }
        `
    })
      .valueChanges
      .pipe(
        map(result => {
          return result.data.product;
        })
      );
  }
}

