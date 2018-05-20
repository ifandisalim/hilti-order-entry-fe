import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {Product} from "../../models/product";
import {ProductProvider} from "../../providers/product/product";
import {ProductHelper} from "../../helpers/productHelper";
import {ProductCategory} from "../../models/productCategory";

/**
 * Generated class for the CompetitorDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-competitor-details',
  templateUrl: 'competitor-details.html',
})
export class CompetitorDetailsPage {

  hiltiProduct: Product = null;
  hiltiProductId: number = null;
  hiltiCategory: ProductCategory = null;
  competitorProducts: Product[] = null;


  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private productService: ProductProvider,
              private productHelper: ProductHelper) {
  }

  ionViewWillLoad() {
    this.hiltiProductId = this.navParams.get("product").id;
    this.hiltiCategory = this.navParams.get("category");

    this.productService.getCompetitorDetails(this.hiltiCategory.id)
      .subscribe(competitorDetails => {

        if(!competitorDetails || competitorDetails.length <=0) {
          return;
        }

        this.competitorProducts = competitorDetails.map(competitor => {
          let clonedCompetitor = Object.assign({}, competitor);
          clonedCompetitor.technicalData = this.productHelper.parseBoschTechnicalData(competitor.technicalData);
          clonedCompetitor.features = this.productHelper.parseFeatureDataString(competitor.features);
          return clonedCompetitor
        });

      });

    this.productService.getProductDetails(this.hiltiProductId)
      .subscribe(productDetail => {

        console.log(productDetail.technicalData);

        let clonedProduct = Object.assign({}, productDetail);
        clonedProduct.technicalData = this.productHelper.parseHiltiTechnicalData(clonedProduct.technicalData);
        clonedProduct.features = this.productHelper.parseFeatureDataString(clonedProduct.features);

        this.hiltiProduct = clonedProduct;
      })
  }


}
