import React from 'react';
import {
  fireEvent,
  render,
  wait,
  waitForDomChange,
  waitForElement
} from '@testing-library/react';
import * as Enzyme from 'enzyme';
import SearchBar from './SearchBar';
import Geocode from 'react-geocode';
import { StoreContext } from '../../store';
import mapsMock from '../../__mocks__/google.maps';

const fromAddress = jest.fn();

fromAddress.mockReturnValue({
  results: [
    {
      geometry: {
        location: {
          lat: `lat`,
          lng: `lng`,
        }
      }
    }
  ]
})

const fromLatLng = jest.fn();

fromLatLng.mockReturnValue({
  results: [
    {
      formatted_address: `address`,
    }
  ],
});

Object.assign(Geocode, {fromAddress, fromLatLng});

const MOCK_PHARMACY = `pharmacy`;
const MOCK_ADDRESS = `address`;
const MOCK_LAT = `lat`;
const MOCK_LNG = `lng`;

const fetchMock = jest.spyOn(global, `fetch`).mockReturnValue(
  Promise.resolve({
    json: () => ([
      MOCK_PHARMACY
    ])
  })
);

describe(`#SearchBar`, () => {
  const dispatch = jest.fn();
  const state = {filter: []};

  beforeAll(() => {
    class AutocompleteService {
      getPlacePredictions(input, cb) {
        cb([
          {
            description: MOCK_ADDRESS
          }
        ]);
      }
    }

    mapsMock.maps.places.AutocompleteService = AutocompleteService;
    global.google = mapsMock;

    const mockGeolocation = {
      getCurrentPosition: jest.fn()
        .mockImplementation((success) => Promise.resolve(success({
          coords: {
            latitude: MOCK_LAT,
            longitude: MOCK_LNG
          }
        })))
    };

    global.navigator.geolocation = mockGeolocation;
  });

  beforeEach(() => {
    fetchMock.mockClear();
  });

  it(`renders`, () => {
    expect(
      Enzyme.render(
        <StoreContext.Provider value={{dispatch, state}}>
          <SearchBar />
        </StoreContext.Provider>
      )
    ).toMatchSnapshot();
  });

  it(`fetches pharmacies when an auto-prediction is clicked`, async () => {
    const { getByText, getByRole, container } = render(
      <StoreContext.Provider value={{dispatch, state}}>
        <SearchBar />
      </StoreContext.Provider>
    );

    const input = getByRole(`textbox`);

    fireEvent.change(input, {target: {value: `data`}});

    await waitForDomChange({container});

    const li = await waitForElement(() => getByText(MOCK_ADDRESS), {container})

    fireEvent.click(li);

    await wait(() => {
      if (dispatch.mock.calls.length === 0) throw new Error(`dispatch not called`);
    });

    const url = fetchMock.mock.calls[0][0];

    expect(fetchMock.mock.calls.length).toBe(1)
    expect(url.endsWith(`location=${MOCK_LAT},${MOCK_LNG}`)).toBeTruthy();
  });

  it(`fetches pharmacies when the location button is clicked`, async () => {
    const { getByRole, container } = render(
      <StoreContext.Provider value={{dispatch, state}}>
        <SearchBar />
      </StoreContext.Provider>
    );

    const button = getByRole(`button`);

    fireEvent.click(button);

    await waitForDomChange({container});

    await wait(() => {
      if (dispatch.mock.calls.length === 0) throw new Error(`dispatch not called`);
    });

    const url = fetchMock.mock.calls[0][0];

    expect(fetchMock.mock.calls.length).toBe(1)
    expect(url.endsWith(`location=${MOCK_LAT},${MOCK_LNG}`)).toBeTruthy();
  });
});

