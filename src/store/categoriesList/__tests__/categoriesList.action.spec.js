import { mockStore } from '../../../utils/mockStore';
import { SET_ITEMS, setItems } from '../categoriesList.actions';

describe('category actions', () => {
  it('SET_ITEMS', async () => {
    const store = mockStore({});

    await store.dispatch(setItems(['123']));

    expect(store.getActions()).toEqual([{ type: SET_ITEMS, value: ['123'] }]);
  });
});
