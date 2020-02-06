import {
  ADD_FILTER,
  REMOVE_FILTER,
  SET_PHARMACIES
} from './constants';

export const setPharmacies = (pharmacies) => ({
  type: SET_PHARMACIES,
  pharmacies
});

export const addFilter = (value) => ({
  type: ADD_FILTER,
  value: value.toUpperCase(),
});

export const removeFilter = (value) => ({
  type: REMOVE_FILTER,
  value: value.toUpperCase(),
});
