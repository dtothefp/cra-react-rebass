import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from '../../store';
import mapsMock from '../../__mocks__/google.maps';

describe(`#App`, () => {
  beforeAll(() => {
    global.google = mapsMock;
  });

  it(`renders without crashing`, () => {
    const {container} = render(
      <Provider>
        <App />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

