[![Amplience Dynamic Content](header.png)](https://amplience.com/dynamic-content)

# dc-extension-product-selector

![Travis](https://img.shields.io/travis/amplience/dc-extension-product-selector)

The product selector extension allows content authors to easily search and select categoories in Commercetools and add them to your content.

The IDs of each category selected are added to the content as an array of strings for Commercetools.

![](/screenshot.png?raw=true)

## Installation Parameters

### Customise 

| paramerter  |  default  | notes   | required |
|---|---|---|---|
| noItemsText | No items selected. | Placeholder text to display when no items are selected. | false
| searchPlaceholderText  | Search  | Placeholder text to show in the search box.  | false 

### Commercetools

The extension works with 'list of text' properties and supports the following parameters:

```json
{
  "backend": "commercetools",
  "apiUrl": "{API URL}",
  "host": "{Auth URL}",
  "projectKey": "{Project key}",
  "clientId": "{Client id}",
  "clientSecret": "{Client secret}",
  "scope": "{Scope of permissions}",
  "locale": "{Locale for text search}"
}
```
Values could be get from creating API Client on Commercetools platform (Settings/Developer settings/Create new API client). 
Required minimal scope of permissions is `manage_categories`.

#### Example Snippet

```json
{
  "product selector": {
    "title": "Category Selector",
    "description": "description",
    "type": "array",
    "minItems": 3,
    "maxItems": 10,
    "items": {
      "type": "string"
    },
    "ui:extension": {
      "url": "https://product-selector.amplience.com",
      "height": 208,
      "params": {
        "backend": "commercetools",
        "apiUrl": "https://api.europe-west1.gcp.commercetools.com",
        "host": "https://auth.europe-west1.gcp.commercetools.com",
        "projectKey": "project-amp",
        "clientId": "clientId",
        "clientSecret": "clientSecret",
        "scope": "view_published_products",
        "locale": "en"
      }
    }
  }
}
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
By default, Create React App produces a build assuming your app is hosted at the server root.  
To override this, specify the homepage in your `package.json`, for example:
 
 `"homepage": "."` <br />
Your app is ready to be deployed!
