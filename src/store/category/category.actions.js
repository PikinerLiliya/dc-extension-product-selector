
export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = value => ({
  type: SET_CATEGORIES,
  value
});

export const changeCategories = value => async dispatch => {
  dispatch(setTypes(value));
}