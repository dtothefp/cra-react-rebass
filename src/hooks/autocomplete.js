/* eslint react-hooks/exhaustive-deps: 0 */
import debounce from 'debounce';
import Geocode from 'react-geocode';
import { useCallback, useState, useEffect, useRef } from "react";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

export default (input) => {
  const [predictions, setPredictions] = useState([]);
  const autocomplete = useRef();

  if (!autocomplete.current) {
    autocomplete.current = new window.google.maps.places.AutocompleteService();
  }

  const getPlacePredictions = (input) => {
    if (!input) return null;

    autocomplete.current.getPlacePredictions({ input }, async (autoPredictions = []) => {
      const descriptions = autoPredictions.map(({description}) => description);

      if(descriptions.includes(input)) {
        return setPredictions([])
      }

      setPredictions(descriptions);
    });
  }

  const debouncedGetPlacePredictions = useCallback(
    debounce(getPlacePredictions, 500),
    []
  );

  useEffect(() => {
    debouncedGetPlacePredictions(input);
  }, [input]);

  return { predictions };
}
