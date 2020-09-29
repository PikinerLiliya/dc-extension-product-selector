import React from 'react';

import {mount} from 'enzyme';
import {mockExtensionWrapper} from '../../utils/mockExtension.js';

import CategoriesGrid, {ProductsGridComponent} from '../CategoriesGrid';
import Category from '../../category/Category.js';

describe('CategoryGrid', () => {

  it('renders without crashing', async () => {
    const {Render, store} = await mockExtensionWrapper();

    mount(
      <Render>
        <CategoriesGrid
          {...store.getState()}
        />
      </Render>
    );
  });

  it('should list all items', async () => {
    const {Render, store} = await mockExtensionWrapper();

    const wrapper = mount(
      <Render>
        <ProductsGridComponent
          {...store.getState()}
          initialised={true}
          items={[{
            id: '1', name: {
              en: '1'
            }
          }, {
            id: '2', name: {
              en: '2'
            }
          }]}
        />
      </Render>
    );

    expect(wrapper.find(Category).children().length).toBe(2);
  });
});