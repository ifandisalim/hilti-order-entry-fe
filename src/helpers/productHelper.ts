import {Injectable} from "@angular/core";
import {ProductTechnicalData} from "../models/productTechnicalData";
import {ProductFeature} from "../models/productFeature";

@Injectable()
export class ProductHelper {

  parseTechnicalDataString(technicalDataString): ProductTechnicalData[] {
    technicalDataString = technicalDataString.replace(/'/g, '"').replace(/" "/g, ' inch "');
    return JSON.parse(technicalDataString);
  }

  parseFeatureDataString(featureDataString: string): ProductFeature[] {
    return featureDataString.split(",").map(feature => {
      return {description: feature}
    });
  }


}
