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
 * Container for displaying filtered products
 */
const Products = ({ products }: Props) => {
  console.log('render');
  return (
    <div className="Products-grid">
      {products.length
        ? products.map((product) => (
            <Product key={product.variantId} product={product} />
          ))
        : 'Sorry, no results'}
    </div>
  );
};

export default Products;
