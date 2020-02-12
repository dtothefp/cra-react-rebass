import React from 'react';
import { fireEvent, queryByAttribute, render } from '@testing-library/react';
import FilterBox from './FilterBox';
import { actions, StoreContext } from '../../store';
import { WALMART } from '../../utils/constants';

describe(`#FilterBox`, () => {
  const dispatch = jest.fn();
  const state = {filter: []};
  const {addFilter, removeFilter} = actions;

  it(`renders`, () => {
    const {container} = render(
      <StoreContext.Provider value={{dispatch, state}}>
        <FilterBox />
      </StoreContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`updates the state when checked`, () => {
    const {container} = render(
      <StoreContext.Provider value={{dispatch, state}}>
        <FilterBox />
      </StoreContext.Provider>
    );

    const name = WALMART.toLowerCase();
    const walmart = queryByAttribute(`name`, container, name);

    fireEvent.click(walmart);
    expect(dispatch.mock.calls[0][0]).toEqual(addFilter(name));

    fireEvent.click(walmart);
    expect(dispatch.mock.calls[1][0]).toEqual(removeFilter(name));
  });
});

