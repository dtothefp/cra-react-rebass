import { renderHook } from '@testing-library/react-hooks'
import useAutoComplete from '../autocomplete';
import mapsMock from '../../__mocks__/google.maps';

describe(`#useAutoComplete`, () => {
  const MOCK_ADDRESS = `address`;

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
  });

  afterEach(() => {

  });

  it(`should make a request when the input value changes`, async () => {
    const VALUE = `value`;
    const { result, waitForNextUpdate } = renderHook(() => useAutoComplete(VALUE));

    await waitForNextUpdate();

    expect(result.current).toEqual({predictions: [MOCK_ADDRESS]});
  });

  it(`should should clear the state if the input value is contained in the descriptions`, async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAutoComplete(MOCK_ADDRESS));

    await waitForNextUpdate();

    expect(result.current).toEqual({predictions: []});
  });
});
