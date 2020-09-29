import SdkAuth from '@commercetools/sdk-auth'
import {ProductSelectorError} from '../ProductSelectorError';
import qs from 'qs';

export class CommerceTools {
  constructor({host, projectKey, clientId, clientSecret, apiUrl, scope = 'manage_categories', locale = 'en'}) {

    this.sdkAuth = new SdkAuth({
      host,
      projectKey,
      disableRefreshToken: false,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes: [scope + ':' + projectKey],
    });

    this.apiUrl = apiUrl;
    this.locale = locale;
  }

  async getHeaders() {
    this.token = await this.sdkAuth.clientCredentialsFlow();
    const {
      token_type, access_token
    } = this.token;

    return {
      headers: {
        'Authorization': `${token_type} ${access_token}`
      }
    };
  }

  async getItems(state, filterIds = []) {
    const {
      PAGE_SIZE,
      params: {
        projectKey
      }
    } = state;
    try {
      if (!filterIds.length) {
        return [];
      }
      const headers = await this.getHeaders();
      const idsStrings = '"' + filterIds.join('","') + '"';

      const params = {
        method: 'GET',
        ...headers
      };

      const queryString = qs.stringify(
        {
          limit: PAGE_SIZE,
          where: `id in (${idsStrings})`
        }
      );

      const response = await fetch(`${this.apiUrl}/${projectKey}/categories?${queryString}`, params);
      const {results} = await response.json();

      let resultsPopulated = await Promise.all(results.map(async (item) => {
        if (item.parent && item.parent.id) {
          const headers = await this.getHeaders();

          const params = {
            method: 'GET',
            ...headers
          };

          const response = await fetch(`${this.apiUrl}/${projectKey}/categories/${item.parent.id}`, params);
          const {name, id} = await response.json();

          item.parent = {
            name,
            id
          }
        }
        return item;
      }));

      return resultsPopulated;

    } catch (e) {
      console.error(e);
      throw new ProductSelectorError('Could not get categories', ProductSelectorError.codes.GET_CATEGORIES);
    }
  }

  getImage({attributes = [], images = []}) {
    const LARGE_IMAGE_KEY = 'largeImageUrl';
    const largeImage = attributes.find(({name = ''}) => name === LARGE_IMAGE_KEY);

    if (largeImage && largeImage.value) {
      return largeImage.value;
    }

    return images.length ? images[0].url : '';
  }

  parseResults(data) {
    return data.map((item) => {
      return {
        id: item.id,
        name: item.name[this.locale],
        image: this.getImage(item.masterVariant)
      }
    })
  }

  async search(state) {
    const {
      searchText,
      page,
      PAGE_SIZE,
      params: {projectKey}
    } = state;

    try {
      const headers = await this.getHeaders();

      const params = {
        method: 'GET',
        ...headers
      };

      const query = {
        offset: page.curPage * PAGE_SIZE,
        limit: PAGE_SIZE,
      };

      if (searchText) {
        query.where = `name(${this.locale} = "${searchText}")`;
      }

      const queryString = qs.stringify(
        query
      );

      const response = await fetch(`${this.apiUrl}/${projectKey}/categories?${queryString}`, params);
      const {results, total} = await response.json();


      let resultsPopulated = await Promise.all(results.map(async (item) => {
        if (item.parent && item.parent.id) {
          const headers = await this.getHeaders();

          const params = {
            method: 'GET',
            ...headers
          };

          const response = await fetch(`${this.apiUrl}/${projectKey}/categories/${item.parent.id}`, params);
          const {name, id} = await response.json();

          item.parent = {
            name,
            id
          }
        }
        return item;
      }));

      return {
        items: resultsPopulated,
        page: {
          numPages: Math.ceil(total / PAGE_SIZE),
          curPage: page.curPage,
          total
        }
      };
    } catch (e) {
      console.error(e);
      throw new ProductSelectorError('Could not search categories', ProductSelectorError.codes.GET_CATEGORIES);
    }
  }

  exportItem(item) {
    return item.id;
  }
}
