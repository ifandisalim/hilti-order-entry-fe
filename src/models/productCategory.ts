import {Product} from "./product";

export interface ProductCategory {
  id?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  isMaster?: boolean;
  childCategories: ProductCategory[];
  parentCategory: ProductCategory;
  products: Product[];
}