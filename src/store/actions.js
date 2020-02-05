import {
  ADD_FILTER,
  REMOVE_FILTER,
} from './constants';

export const addFilter = (value) => ({
  type: ADD_FILTER,
  value,
});

export const removeFilter = (value) => ({
  type: REMOVE_FILTER,
  value,
});
