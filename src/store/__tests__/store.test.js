import reducer from '../reducer';
import {
  addFilter,
  removeFilter,
  setPharmacies
} from '../actions';

describe(`#reducer`, () => {
  const initialState = {
    filter: [],
    pharmacies: [],
  };
  const dispatch = (action) => reducer(initialState, action);

  it(`adds pharmacies`, () => {
    const pharmacies = [`A`, `B`];
    const state = dispatch(setPharmacies(pharmacies));

    expect(state.pharmacies).toBe(pharmacies);
  });

  it(`adds a filter`, () => {
    const filter = `A`;
    const state = dispatch(addFilter(filter));

    expect(state.filter.includes(filter)).toBeTruthy();
  });

  it(`removes a filter`, () => {
    const filter = `A`;
    let state = dispatch(addFilter(filter));

    expect(state.filter.includes(filter)).toBeTruthy();

    state = dispatch(removeFilter(filter));

    expect(!state.filter.includes(filter)).toBeTruthy();
  });
});
