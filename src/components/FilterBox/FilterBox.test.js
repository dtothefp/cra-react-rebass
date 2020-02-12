import React from 'react';
import { mount, render } from 'enzyme';
import FilterBox from './FilterBox';
import { actions, StoreContext } from '../../store';
import { WALMART } from '../../utils/constants';

describe(`#FilterBox`, () => {
  const dispatch = jest.fn();
  const state = {filter: []};
  const {addFilter, removeFilter} = actions;

  it(`renders`, () => {
    expect(
      render(
        <StoreContext.Provider value={{dispatch, state}}>
          <FilterBox />
        </StoreContext.Provider>
      )
    ).toMatchSnapshot();
  });

  it(`updates the state when checked`, () => {
    const wrapper = mount(
      <StoreContext.Provider value={{dispatch, state}}>
        <FilterBox />
      </StoreContext.Provider>
    );

    const name = WALMART.toLowerCase();
    const walmart = wrapper.find(`input[name="${name}"]`);

    walmart.simulate(`change`, {target: {checked: true, name}});
    expect(dispatch.mock.calls[0][0]).toEqual(addFilter(name));

    walmart.simulate(`change`, {target: {checked: false, name}});
    expect(dispatch.mock.calls[1][0]).toEqual(removeFilter(name));
  });
});

