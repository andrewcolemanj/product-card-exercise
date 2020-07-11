// @flow

import React from 'react';
import Product from './Product';
import type { Product as ProductData } from '../services/fetchProducts';
import './Products.css';

type Props = {
  products: ProductData[],
};

/**
 * @component
 * For displaying all filtered products
 */
const Products = ({ products }: Props) => (
  <div className="Products-grid">
    {products.length
      ? products.map((product) => (
          <Product key={product.variantId} product={product} />
        ))
      : 'Sorry, no results'}
  </div>
);

export default Products;
