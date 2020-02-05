import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import * as _actions from './actions';
import * as _constants from './constants';

export const actions = _actions;
export const constants = _constants;

export const StoreContext = createContext();

export const Provider = ({children, store = {}}) => {
  const [ state, dispatch ] = useReducer(reducer, store);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};
