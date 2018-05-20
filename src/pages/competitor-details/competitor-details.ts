import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Product} from "../../models/product";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.hiltiProduct = this.navParams.get("product");
    console.log(this.hiltiProduct)
  }


}
