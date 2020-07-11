const express = require('express');
const cors = require('cors');
const products = require('../src/products.json');

const app = express();
const port = process.env.PORT || 9001;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.get('/products', cors(corsOptions), (req, res) => {
  return res.json(
    products
      .filter((product) => product.isVisible)
      .map((product) => ({
        categories: product.categories.map((category) => category.name),
        description: product.description,
        imageFilename: product.imageFilename,
        merchRank: product.merchRank,
        name: product.name,
        price: product.price,
        productId: product.productId,
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
      }))
  );
});

app.listen(port, () => console.info(`App started, listening on ${port}`));
