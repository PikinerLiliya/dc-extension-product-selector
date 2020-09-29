import {SET_CATEGORIES} from './category.actions';

export function categoriesReducer(state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.value;
    default:
      return state;
  }
}
