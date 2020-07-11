// @type

import React from 'react';
import './PageNav.css';
import { PRODUCTS_PER_PAGE } from '../constants';

type Props = {
  numProducts: number,
  page: number,
  setPage: (number) => void,
};

/**
 * @component
 * Controls navigation through all filteredProducts
 */
const PageNav = ({ numProducts, page, setPage }: Props) => (
  <>
    {/* Only show back button if we are not already on the first page */}
    {page > 0 && (
      <button onClick={() => setPage(page - 1)}>
        <b>{'<'}</b>
      </button>
    )}
    <span className="Page-label">Page: {page}</span>
    {/* Only show next button if there are more products to view */}
    {numProducts > (page + 1) * PRODUCTS_PER_PAGE && (
      <button onClick={() => setPage(page + 1)}>
        <b>{'>'}</b>
      </button>
    )}
  </>
);

export default PageNav;
