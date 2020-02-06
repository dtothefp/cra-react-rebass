import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer';
import * as _actions from './actions';
import * as _constants from './constants';

export const actions = _actions;
export const constants = _constants;

export const StoreContext = createContext();

const _Provider = ({children, store = {}}) => {
  const [ state, dispatch ] = useReducer(reducer, store);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

_Provider.propTypes = {
  store: PropTypes.object,
  children: PropTypes.element.isRequired
}

export const Provider = _Provider;
