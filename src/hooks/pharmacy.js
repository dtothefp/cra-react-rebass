/* eslint react-hooks/exhaustive-deps: 0 */
import { useCallback, useState, useContext, useEffect } from 'react';
import { actions, StoreContext } from '../store';
import { chainIds } from '../utils/constants';

const BASE_URL = `https://www.goodrx.com/api/v4/pharmacies`;
const {setPharmacies} = actions;

export default ({lat, lng} = {}) => {
  const [loading, setLoading] = useState(false);
  const {dispatch, state: {filter = []}} = useContext(StoreContext);
  const fetchPharmacies = useCallback(async (lat, lng) => {
    if (lat && lng) {
      setLoading(true);

      const chain = filter.reduce((str, loc) => (
        str += `chain_id=${chainIds[loc]}&`
      ), ``);
      const url = `${BASE_URL}?${chain}location=${lat},${lng}`;
      const {pharmacies} = await fetch(url).then((resp) => resp.json());

      dispatch(setPharmacies(pharmacies));
      setLoading(false);
    }
  }, [lat, lng, filter.length]);

  useEffect(() => {
    fetchPharmacies(lat, lng)
  }, [lat, lng, filter.length]);

  return {loading};
};
