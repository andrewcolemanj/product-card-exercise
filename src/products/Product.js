// @flow

import React from 'react';
import type { Product as ProductData } from '../services/fetchProducts';
import './Product.css';

/**
 * @param {ProductData} product
 * @returns an image url
 */
const toImageUrl = (product: ProductData) =>
  `//res.cloudinary.com/imperfect/image/upload/w_400,h_260,c_pad,b_auto,d_products:no-image-found.png/${product.imageFilename}`;

type Props = {
  product: ProductData,
};

/**
 * @component
 * Component containing the image, name, and price of a product
 */
const Product = ({ product }: Props) => {
  return (
    <div className="Product-card">
      <div>
        <img src={toImageUrl(product)} alt={product.name} />
      </div>
      <div>{product.name}</div>
      <div>
        {product.retailPrice && <strike>${product.retailPrice}</strike>} $
        {product.price}
        {product.packageUnitAmount &&
          product.packageUnitFormatted &&
          ` | ${product.packageUnitAmount} ${product.packageUnitFormatted}`}
      </div>
    </div>
  );
};

export default Product;
