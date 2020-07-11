// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import Products from './products/Products';
import type { ProductsData } from './services/fetchProducts';
import fetchProducts from './services/fetchProducts';
import { ALL_PRODUCTS_FILTER, PRODUCTS_PER_PAGE } from './constants';
import CategoryFilter from './filter/CategoryFilter';
import TagsFilter from './filter/TagsFilter';
import PageNav from './pagination/PageNav';
import { productHasCategory, productHasAllTags } from './filter/utilities';

// TODO: Add searchbox to search by name? By description?
// TODO: Add Unit tests for components

/**
 * Top-level component
 * @component
 * State of the component:
 * @type {ProductData} productsData - All available products.
 * @type {boolean} isLoading - Waiting for API response.
 * @type {Set<string>} filterTags - The set of all user-selected tags to filter products by.
 * @type {string} filterCategory - The user-selected category to filter by.
 */
const App = () => {
  const [productsData, setProductsData] = useState<ProductsData>({
    products: [],
    tags: [],
    categories: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filterTags, setFilterTags] = useState<Set<string>>(new Set());
  const [filterCategory, setFilterCategory] = useState<string>(
    ALL_PRODUCTS_FILTER
  );
  const [page, setPage] = useState<number>(0);

  // Get the list of products from the API on mount.
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const response = await fetchProducts();
      setProductsData(response);
      setIsLoading(false);
    };
    getProducts();
  }, []);

  // Reset to page zero when the filters change
  useEffect(() => {
    setPage(0);
  }, [filterTags, filterCategory]);

  const filteredProducts = productsData.products.filter((product) => {
    return (
      productHasCategory(product, filterCategory) &&
      productHasAllTags(product, filterTags)
    );
  });

  return (
    <div className="app">
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div className="App-row">
            <CategoryFilter
              setFilterCategory={setFilterCategory}
              categories={productsData.categories}
            />
          </div>
          <div className="App-row">
            <TagsFilter
              addTag={(tag) => setFilterTags(new Set(filterTags).add(tag))}
              removeTag={(tag) => {
                const newTags = new Set(filterTags);
                newTags.delete(tag);
                setFilterTags(newTags);
              }}
              tags={productsData.tags}
            />
          </div>
          <div className="App-row">
            <Products
              products={filteredProducts.slice(
                page * PRODUCTS_PER_PAGE,
                page * PRODUCTS_PER_PAGE + PRODUCTS_PER_PAGE
              )}
            />
          </div>
          {filteredProducts.length > PRODUCTS_PER_PAGE && (
            <div className="App-row">
              <PageNav
                numProducts={filteredProducts.length}
                page={page}
                setPage={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
