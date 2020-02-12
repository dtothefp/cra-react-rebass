import React from 'react';
import { render } from 'enzyme';
import App from './App';
import { Provider } from '../../store';
import mapsMock from '../../__mocks__/google.maps';

describe(`#App`, () => {
  beforeAll(() => {
    global.google = mapsMock;
  });

  it(`renders without crashing`, () => {
    expect(
      render(
        <Provider>
          <App />
        </Provider>
      )
    ).toMatchSnapshot();
  });
});

