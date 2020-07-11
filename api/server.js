const express = require('express');
const cors = require('cors');
const dbProducts = require('../src/products.json');

const app = express();
const port = process.env.PORT || 9001;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.get('/products', cors(corsOptions), (req, res) => {
  const products = dbProducts
    .filter((product) => product.isVisible && product.stock > 0)
    .map((product) => ({
      categories: product.categories.map((category) => category.name),
      description: product.description,
      imageFilename: product.imageFilename,
      name: product.name,
      packageUnitAmount: product.packageUnitAmount,
      packageUnitFormatted: product.packageUnitFormatted,
      price: product.price,
      productName: product.productName,
      retailPrice: product.retailPrice,
      tags: product.tags.reduce(
        (tagsObj, tag) => ({
          ...tagsObj,
          [tag.name]: true,
        }),
        {}
      ),
      variantId: product.variantId,
    }));

  const tagsSet = new Set();
  const categoriesSet = new Set();
  dbProducts.forEach((product) => {
    product.tags.forEach((tag) => tagsSet.add(tag.name));
    product.categories.forEach((category) => categoriesSet.add(category.name));
  });

  return res.json({
    products,
    tags: Array.from(tagsSet),
    categories: Array.from(categoriesSet),
  });
});

app.listen(port, () => console.info(`App started, listening on ${port}`));
