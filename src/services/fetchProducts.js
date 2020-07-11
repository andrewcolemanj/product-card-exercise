// @flow

import axios from 'axios';
import { PRODUCTS_API } from './routes';

export type Product = {
  categories: string[],
  description: string,
  imageFilename: string,
  name: string,
  packageUnitAmount: ?number,
  packageUnitFormatted: ?number,
  price: number,
  productName: string,
  retailPrice: ?number,
  tags: { [string]: boolean },
  variantId: string,
};

export type ProductsData = {
  products: Product[],
  tags: string[],
  categories: string[],
};

/**
 * Fetches all currently available products
 * @returns {Promise<ProductsData>}
 */
const fetchProducts = async (): Promise<ProductsData> => {
  const response = await axios.get(PRODUCTS_API);
  return response.data;
};

export default fetchProducts;
