import { basicReducer } from '../../../utils/basicReducer';
import { categoriesListReducer } from '../categoriesList.reducer';
import { SET_ITEMS } from '../categoriesList.actions';

describe('categories reducer', () => {
  it('SET_ITEMS', () => {
    basicReducer(categoriesListReducer, [
      {
        action: {
          type: SET_ITEMS,
          value: ['123']
        },
        expected: ['123']
      },
      { action: { type: '', value: '' }, expected: [] }
    ]);
  });
});
