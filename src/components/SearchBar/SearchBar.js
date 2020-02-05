import React, { useState, useContext } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';
import { actions, StoreContext } from '../../store';

const SearchBar = () => {
  console.log('*****buttton', Button);
  const [state, setState] = useState('');
  const {dispatch} = useContext(StoreContext);
  const handleChange = (e) => {
    const {value} = e.target;

    console.log('change');

    setState(value);
  };

  const handleSubmit = () => {
    console.log('submitted');
  };

  return (
    <Flex as="form"
      onSubmit={handleSubmit}
      my={4}
    >
      <Input
        type="text"
        name="search"
        onChange={handleChange}
        placeholder="search"
        value={state}
        mr={2}
        width="70%"
      />
      <Button
        width="30%"
        color="black"
      >My Location</Button>
    </Flex>
  );
};

export default SearchBar;
