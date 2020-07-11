// @flow

import React from 'react';
import { ALL_PRODUCTS_FILTER } from '../constants';

type Props = {
  categories: string[],
  setFilterCategory: (string) => void,
};

/**
 * @component
 * Dropdown to filter products by category
 * Only products that match the selected category are shown
 */
const CategoryFilter = ({ categories, setFilterCategory }: Props) => (
  <div className="Filters-row">
    <select onChange={(event) => setFilterCategory(event.target.value)}>
      <option value={ALL_PRODUCTS_FILTER}>{ALL_PRODUCTS_FILTER}</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
);

export default CategoryFilter;
