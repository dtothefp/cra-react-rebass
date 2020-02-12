/* eslint react/prop-types:0 */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import usePharmacy from '../pharmacy';
import { StoreContext, actions } from '../../store';
import { chainIds, WALMART } from '../../utils/constants';

const {setPharmacies} = actions;

describe(`#usePharmacy`, () => {
  const MOCK_PHARMACY = `pharmacy`;
  const MOCK_LAT = `lat`;
  const MOCK_LNG = `lng`;

  const fetchMock = jest.spyOn(global, `fetch`).mockReturnValue(
    Promise.resolve({
      json: () => ({
        pharmacies: [
          MOCK_PHARMACY
        ]
      })
    })
  );

  afterEach(() => {
    fetchMock.mockClear();
  });

  it(`should make a request when lat & lng changes`, async () => {
    const state = {
      filter: [],
    };
    const dispatch = jest.fn();
    const wrapper = ({ children }) => <StoreContext.Provider value={{state, dispatch}}>{children}</StoreContext.Provider>
    const { result, waitForNextUpdate } = renderHook(() => usePharmacy({ lat: MOCK_LAT, lng: MOCK_LNG }), { wrapper });

    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(!result.current.loading).toBeTruthy();
    expect(fetchMock.mock.calls[0][0].endsWith(`location=${MOCK_LAT},${MOCK_LNG}`)).toBeTruthy();
    expect(dispatch.mock.calls[0][0]).toEqual(setPharmacies([MOCK_PHARMACY]));
  });

  it(`should make a request when filter changes`, async () => {
    const state = {
      filter: [WALMART],
    };
    const dispatch = jest.fn();
    const wrapper = ({ children }) => <StoreContext.Provider value={{state, dispatch}}>{children}</StoreContext.Provider>
    const { waitForNextUpdate } = renderHook(() => usePharmacy({ lat: `lat`, lng: `lng` }), { wrapper });

    await waitForNextUpdate();

    expect(fetchMock.mock.calls[0][0].endsWith(`chain_id=${chainIds[WALMART]}&location=${MOCK_LAT},${MOCK_LNG}`)).toBeTruthy();
  });
});
