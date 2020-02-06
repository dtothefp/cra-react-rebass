/* eslint react-hooks/exhaustive-deps: 0 */
import { useState, useContext, useEffect } from 'react';
import { actions, StoreContext } from '../store';
import { chainIds } from '../utils/constants';

const BASE_URL = `https://www.goodrx.com/api/v4/pharmacies`;
const { setPharmacies } = actions;

export default ({lat, lng} = {}) => {
  const [loading, setLoading] = useState(false);
  const {dispatch, state: {filter = []}} = useContext(StoreContext);

  useEffect(() => {
    if (lat && lng) {
      const chain = filter.reduce((str, loc) => (
        str += `chain_id=${chainIds[loc]}&`
      ), ``);

      const url = `${BASE_URL}?${chain}location=${lat},${lng}`;

      setLoading(true);

      fetch(url)
        .then((resp) => resp.json())
        .then(({pharmacies}) => {
          dispatch(setPharmacies(pharmacies));
          setLoading(false);
        });
    }

  }, [lat, lng, filter.length]);

  return {loading};
};
