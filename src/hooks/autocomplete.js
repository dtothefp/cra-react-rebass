/* eslint react-hooks/exhaustive-deps: 0 */
import debounce from 'debounce';
import { useCallback, useState, useEffect, useRef } from "react";

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
