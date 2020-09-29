import { basicReducer } from '../../../utils/basicReducer';
import { categoriesReducer } from '../category.reducer';
import { SET_CATEGORIES } from '../category.actions';

describe('categories reducer', () => {
  it('SET_CATEGORIES', () => {
    basicReducer(categoriesReducer, [
      {
        action: {
          type: SET_CATEGORIES,
          value: ['123']
        },
        expected: ['123']
      },
      { action: { type: '', value: '' }, expected: [] }
    ]);
  });
});
