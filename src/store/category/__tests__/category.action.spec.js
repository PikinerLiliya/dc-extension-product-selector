import {mockStore} from '../../../utils/mockStore';
import {SET_CATEGORIES, setCategories} from '../category.actions';

describe('category actions', () => {
  it('SET_CATEGORIES', async () => {
    const store = mockStore({});

    await store.dispatch(setCategories(['123']));

    expect(store.getActions()).toEqual([{type: SET_CATEGORIES, value: ['123']}]);
  });
});
