// @flow

import React, { useState, useEffect } from 'react';
import './App.css';
import Products from './products/Products';
import type { Product, ProductsData } from './services/fetchProducts';
import fetchProducts from './services/fetchProducts';
import { ALL_PRODUCTS_FILTER, PRODUCTS_PER_PAGE } from './constants';
import CategoryFilter from './filter/CategoryFilter';
import TagsFilter from './filter/TagsFilter';
import PageNav from './pagination/PageNav';

// Add searchbox by name? Description?
// Paginate with ~8-12 per page

/**
 * Top-level component
 * @component
 * State of the component:
 * @type {ProductData} productsData - All available products.
 * @type {Set<string>} filterTags - The set of all user-selected tags to filter products by.
 * @type {string} filterCategory - The user-selected category to filter by.
 */
const App = () => {
  const [productsData, setProductsData] = useState<ProductsData>({
    products: [],
    tags: [],
    categories: [],
  });
  const [filterTags, setFilterTags] = useState<Set<string>>(new Set());
  const [filterCategory, setFilterCategory] = useState<string>(
    ALL_PRODUCTS_FILTER
  );
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProductsData(response);
    };
    getProducts();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [filterTags, filterCategory]);

  // Returns true only if a product has all filterTags
  const hasAllTags = (product: Product) => {
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

  // Returns true only if the product has the filterCategory
  const hasCategory = (product: Product) => {
    if (filterCategory === ALL_PRODUCTS_FILTER) {
      return true;
    }
    return product.categories.some((category) => category === filterCategory);
  };

  const filteredProducts = productsData.products.filter((product) => {
    return hasCategory(product) && hasAllTags(product);
  });

  return (
    <div className="app">
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
    </div>
  );
};

export default App;
