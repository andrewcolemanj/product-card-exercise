# Product Card Exercise

This repository is a simple application for displaying a list of grocery products. Its main purpose is for use as a code sample.

The application may be [run locally](#running). Products may be filtered by category (e.g. "Sweet Snacks") through a dropdown or by any number of tags (e.g. "Organic") through checkboxes. 8 products are shown per page. The user may click through more products by using the page navigation at the bottom of the page.

**Quick Links**

- [Running](#running)
- [Testing](#testing)
- [Flow Types](#types)
- [Component Structure](#component-structure)
- [Next Steps](#next-steps)

## Running

After pulling down the repo, you must first install dependencies:

```sh
$ npm install
```

The frontend is served by a node express server. To start the server:

```sh
$ node api/server.js
```

Then, to run the app in development mode:

```sh
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Testing

To run unit tests:

```sh
$ npm run test
```

This launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

The filtering logic is tested extensively in src/filter/utilities.test.js

See [Next Steps](#next-steps) for ideas for how testing could be further developed.

## Flow Types

This app uses [flow types](https://flow.org/) as a way of documenting React components, expected props, and function signatures, as well as a way to catch errors before runtime.

To check for type errors, run:

```sh
$ npm run flow
```

See [flow documentation](https://flow.org/en/docs/install/) for more details on how to setup your IDE.

## Component Structure

Most of the app's state is stored at the top-level component, `<App>`.

On mount, `<App>` calls the `fetchProducts` service which executes the GET request to our node.js server. After making the request, while waiting for the asynchronous response, `isLoading` is set to true, giving the user feedback that the request for data is being made.

`<App>` then stores the response in its component state, which contains the list of products, the list of categories to filter on, and the list of tags to filter on.

`<App>` renders a `<CategoryFilter>` and a `<TagsFilter>`, passing down the necessary data for the components to be rendered and a function to call when the filters change due to user interaction.

`<App>` renders a `<PageNav>` with simple arrows for the user to navigate through a long list of products. Currently, only 8 products are displayed on a page at a time, though this can be changed by altering the `PRODUCTS_PER_PAGE` in `constants.js`. The App is reset to the initial page when the filters change.

`<App>` renders a `<Products>` component, passing an array of product data that is filtered based on the state of the Category Filter, the Tags Filter, and the Page the user is on.

The folder structure reflects the component structure.

## Next Steps

There are many enhancements that could be made on this simple application. For example:

- There is much room for improvement for the UX of the page
  - Make the app responsive, mobile-friendly, a11y
  - Better UX all around with the filters, interacting with the products
- More unit tests should be written to test individual components
- More features could be added
- If the app were going to grow more complicated, with shopping carts, checkout, etc., the app's state could be moved to one managed by `react-redux`
