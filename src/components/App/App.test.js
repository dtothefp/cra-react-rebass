import React from 'react';
import { shallow, render } from 'enzyme';
import App from './App';
import { Provider } from '../../store';
import mapsMock from '../../mocks/google.maps';

describe('#App', () => {
  beforeAll(() => {
    global.google = mapsMock;
  });

  it('renders without crashing', () => {
    expect(
      render(
        <Provider>
          <App />
        </Provider>
      )
    ).toMatchSnapshot();
  });
});

