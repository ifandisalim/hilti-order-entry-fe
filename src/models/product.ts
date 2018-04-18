import {ProductCategory} from "./productCategory";
import {ProductApplication} from "./productApplication";
import {ProductFeature} from "./productFeature";
import {ProductContent} from "./productContent";

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: ProductCategory;
  applications: Array<ProductApplication>;
  features?: Array<ProductFeature>;
  content?: Array<ProductContent>;
}