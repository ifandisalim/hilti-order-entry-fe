import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Product} from "../../models/product";
import {ProductProvider} from "../../providers/product/product";
import {ProductHelper} from "../../helpers/productHelper";

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
  competitorProducts: Product[] = null;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private productService: ProductProvider,
              private productHelper: ProductHelper) {
  }

  ionViewWillLoad() {
    this.hiltiProduct = this.navParams.get("product");
    console.log(this.hiltiProduct);
    this.productService.getCompetitorDetails(this.hiltiProduct.id)
      .subscribe(competitorDetails => {

        console.log("competitor details");
        console.log(competitorDetails);

        if(!competitorDetails || competitorDetails.length <=0) {
          return;
        }

        this.competitorProducts = competitorDetails.map(competitor => {
          let clonedCompetitor = Object.assign({}, competitor);
          clonedCompetitor.technicalData = this.productHelper.parseTechnicalDataString(competitor.technicalData);
          clonedCompetitor.features = this.productHelper.parseFeatureDataString(competitor.features);
          return clonedCompetitor
        });

        console.log("==========Competitor products===========");
        console.log(this.competitorProducts)

      });
  }


}
