import {
  ADD_FILTER,
  REMOVE_FILTER,
} from './constants';

export default (state = {}, action) => {
  let updatedState;

  switch (action.type) {
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
  }

  if (process.env.NODE_ENV === `development`) {
    console.log(`***UPDATED_STATE***`, updatedState);
  }

  return updatedState;
}
