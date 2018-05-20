import {Injectable} from "@angular/core";
import {ProductTechnicalData} from "../models/productTechnicalData";
import {ProductFeature} from "../models/productFeature";

@Injectable()
export class ProductHelper {

  parseBoschTechnicalData(technicalDataString): ProductTechnicalData[] {
    technicalDataString = technicalDataString
      .replace(/"/g, ' inch')
      .replace(/\r?\n/g, '')
      .replace(/''/g, '')
      .replace(/'/g, '"')
      .replace(/\s\s+/g, '')
      .replace(/""/g, '');

    return JSON.parse(technicalDataString);
  }

  parseHiltiTechnicalData(technicalDataString): ProductTechnicalData[] {
    technicalDataString = "[" + technicalDataString + "]";
    return JSON.parse(technicalDataString);
  }

  parseFeatureDataString(featureDataString: string): ProductFeature[] {
    return featureDataString.split(",").map(feature => {
      return {description: feature}
    });
  }


}
