import React from 'react';
import { render } from '@testing-library/react';
import PharmacyList from './PharmacyList';
import { Provider } from '../../store';
import pharmacyMock from '../../__mocks__/pharmacy.item';

describe(`#App`, () => {
  it(`renders without crashing`, () => {
    const store = {
      pharmacies: [pharmacyMock],
    };
    const {container} = render(
      <Provider store={store}>
        <PharmacyList />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

