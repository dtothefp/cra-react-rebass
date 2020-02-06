import React, { useState } from 'react';
import Geocode from 'react-geocode';
import { Box, Button, Card, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';
import useAutoComplete from '../../hooks/autocomplete';
import usePharmacyRequest from '../../hooks/pharmacy';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState(``);
  const [geolocation, setGeoLocation] = useState({});
  const [disabled, setDisabled] = useState(false);
  const predictions = useAutoComplete(searchValue);
  const {loading} = usePharmacyRequest(geolocation);

  const handleChange = (e) => {
    const {value} = e.target;

    setSearchValue(value);
  };

  const handleValueSelection = (prediction) => async () => {
    setSearchValue(prediction);
    setDisabled(true);

    const response = await Geocode.fromAddress(prediction);
    const geoData = response.results[0].geometry.location;

    setGeoLocation(geoData);
    setDisabled(false);
  };

  const handleLocationSelection = async () => {
    setDisabled(true);

    const {
      coords: {
        latitude: lat,
        longitude: lng,
      }
    } = await new Promise((res) => navigator.geolocation.getCurrentPosition(res));

    setGeoLocation({
      lat,
      lng,
    });

    const {results} = await Geocode.fromLatLng(lat, lng)
    const address = results[0].formatted_address;

    setSearchValue(address);
    setDisabled(false);
  };

  const isDisabled = loading || disabled;

  return (
    <Flex
      my={4}
      flexWrap='wrap'
    >
      <Box
        width={["100%", "70%"]}
        sx={{
          position: `relative`,
        }}
      >
        <Box
          mr={[0, 2, 2]}
          mb={[2, 0, 0]}
        >
          <Input
            type="text"
            onChange={handleChange}
            placeholder="search"
            value={searchValue}
            disabled={isDisabled}
            sx={{
              '&:disabled': {
                backgroundColor: 'gray',
              },
            }}
          />
          <Card
            as="ul"
            p={0}
            bg="white"
            width="100%"
            sx={{
              position: `absolute`,
              listStyle: `none`,
              zIndex: 1000
            }}
          >
            {predictions.map((prediction, index) => (
              <Text
                as="li"
                p={2}
                onClick={handleValueSelection(prediction)}
                sx={{
                  cursor: `pointer`,
                }}
                key={index}>{prediction}
              </Text>
            ))}
          </Card>
        </Box>
      </Box>
      <Button
        width={["100%", "30%"]}
        color="black"
        onClick={handleLocationSelection}
        disabled={isDisabled}
        sx={{
          cursor: `pointer`,
          '&:disabled': {
            backgroundColor: 'gray',
          },
        }}
      >My Location</Button>
    </Flex>
  );
};

export default SearchBar;
