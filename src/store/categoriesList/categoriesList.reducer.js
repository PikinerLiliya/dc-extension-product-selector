import {SET_ITEMS} from './categoriesList.actions';

export function categoriesListReducer(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.value;
    default:
      return state;
  }
}
