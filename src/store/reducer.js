import {
  ADD_FILTER,
  REMOVE_FILTER,
  SET_PHARMACIES
} from './constants';

export default (state = {}, action) => {
  let updatedState;

  switch (action.type) {
    case SET_PHARMACIES:
      updatedState = {
        ...state,
        pharmacies: action.pharmacies
      };
      break;
    case ADD_FILTER:
      updatedState = {
        ...state,
        filter: [ ...state.filter, action.value ]
      };
      break;
    case REMOVE_FILTER:
     updatedState = {
        ...state,
        filter: state.filter.filter((value) => value !== action.value),
      };
      break;
    default:
      updatedState = state;
    break;
  }

  if (process.env.NODE_ENV === `development`) {
    console.log(`***UPDATED_STATE***`, updatedState);
  }

  return updatedState;
}
