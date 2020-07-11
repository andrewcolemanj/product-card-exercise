// @flow

import type { Product } from '../services/fetchProducts';
import { ALL_PRODUCTS_FILTER } from '../constants';

/**
 * Does a given product have all selected filterTags?
 * @param {Product} product
 * @param {Set<string>} filterTags The user-selected tags
 * @return {boolean} true only if product has all filterTags
 */
export const productHasAllTags = (
  product: Product,
  filterTags: Set<string>
) => {
  // If no tags are selected, do not filter on tags.
  if (!filterTags.size) {
    return true;
  }
  let hasTags = true;
  const tagValues = filterTags.values();
  let nextTag = tagValues.next();
  while (hasTags && !nextTag.done) {
    if (!product.tags[nextTag.value]) {
      hasTags = false;
    }
    nextTag = tagValues.next();
  }
  return hasTags;
};

/**
 * Does a given product have the selected filterCategory?
 * @param {Product} product
 * @param {string} filterCategory The user-selected category
 * @return {boolean} true if product has the filterCategory
 */
export const productHasCategory = (
  product: Product,
  filterCategory: string
) => {
  if (filterCategory === ALL_PRODUCTS_FILTER) {
    return true;
  }
  return product.categories.some((category) => category === filterCategory);
};
