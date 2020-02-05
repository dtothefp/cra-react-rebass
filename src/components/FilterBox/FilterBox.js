import React, { useContext } from 'react';
import { Box, Card, Flex, Text } from 'rebass';
import { Checkbox, Input, Label } from '@rebass/forms';
import { chainIds } from '../../utils/constants';
import { actions, StoreContext } from '../../store';

const {addFilter, removeFilter} = actions;

const FilterBox = () => {
  const {dispatch} = useContext(StoreContext);
  const handleChange = (e) => {
    const {checked, name} = e.target;

    dispatch(
      checked ? addFilter(name) : removeFilter(name)
    );
  };

  return (
    <Flex as="form">
      {Object.keys(chainIds).map((name, i) => (
        <Label
          key={`${name}-${i}`}
        >
          <Checkbox
            name={name.toLowerCase()}
            onChange={handleChange}
            sx={{
              position: 'relative',
              top: '-4px',
              backgroundColor: `transparent !important`,
            }}
          />
          {name}
        </Label>
      ))}
    </Flex>
  );
};

export default FilterBox;
