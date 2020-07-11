import type { Product } from '../services/fetchProducts';
import { productHasCategory, productHasAllTags } from './utilities';
import { ALL_PRODUCTS_FILTER } from '../constants';

const mockCategories = ['Vegetables', 'Prepared Foods', 'Fruits'];
const mockTags = new Set(['Organic', 'Non-GMO']);
const productTags = {};
Array.from(mockTags).forEach((tag) => (productTags[tag] = true));

const mockProduct: Product = {
  categories: mockCategories,
  description:
    'Heirloom corn picked yesterday for that special duck in your life',
  imageFilename: 'duckFood',
  name: 'Sweet sweet duck food',
  packageUnitAmount: null,
  packageUnitFormatted: null,
  price: 18.99,
  productName: 'GoodEarth duck food',
  retailPrice: null,
  tags: productTags,
  variantId: 'c78vacj-fda-xxca',
};

describe('filter products utilities', () => {
  describe('productHasCategory', () => {
    it('returns true when the product has the filteredCategory', () => {
      expect(productHasCategory(mockProduct, 'Vegetables')).toBe(true);
    });

    it('returns false when the product does not have the filteredCategory', () => {
      expect(productHasCategory(mockProduct, 'Meat')).toBe(false);
    });

    describe('when the category is All Products', () => {
      const filteredCategory = ALL_PRODUCTS_FILTER;

      it('returns true', () => {
        expect(productHasCategory(mockProduct, filteredCategory)).toBe(true);
      });

      it('returns true even when product has no categories', () => {
        expect(
          productHasCategory(
            { ...mockProduct, categories: [] },
            filteredCategory
          )
        ).toBe(true);
      });
    });
  });

  describe('productHasAllTags', () => {
    it('returns true when the product has all filtered tags', () => {
      expect(productHasAllTags(mockProduct, mockTags)).toBe(true);
    });

    it('returns false when the product does not have a filtered tag', () => {
      expect(productHasAllTags(mockProduct, new Set(['Conventional']))).toBe(
        false
      );
    });

    it('returns false when the product has some, but not all filtered tags', () => {
      const manyFilteredTags = new Set(mockTags);
      manyFilteredTags.add('Conventional');
      expect(productHasAllTags(mockProduct, manyFilteredTags)).toBe(false);
    });

    describe('when no tags are selected', () => {
      const emptySetTags = new Set();

      it('returns true', () => {
        expect(productHasAllTags(mockProduct, emptySetTags)).toBe(true);
      });

      it('returns true even when product has no tags', () => {
        expect(
          productHasAllTags({ ...mockProduct, tags: {} }, emptySetTags)
        ).toBe(true);
      });
    });
  });
});
