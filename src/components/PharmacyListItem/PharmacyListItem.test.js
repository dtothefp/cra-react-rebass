import React from 'react';
import { render } from '@testing-library/react';
import PharmacyListItem from './PharmacyListItem';
import pharmacyMock from '../../__mocks__/pharmacy.item';

const {address, name, phone_number: phone} = pharmacyMock;

describe(`#App`, () => {
  it(`renders without crashing`, () => {
    const {container} = render(
      <PharmacyListItem
        address={address}
        name={name}
        phone={phone}
      />
    );

    expect(container).toMatchSnapshot();
  });
});

