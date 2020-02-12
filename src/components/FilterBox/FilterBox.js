import React, { useContext } from 'react';
import { Flex } from 'rebass';
import { Checkbox, Label } from '@rebass/forms';
import { chainIds } from '../../utils/constants';
import { actions, StoreContext } from '../../store';

const {addFilter, removeFilter} = actions;
const ids = Object.keys(chainIds);
const desktopWidth = 100 / ids.length;
const midWidth = desktopWidth * 2;

const FilterBox = () => {
  const {dispatch} = useContext(StoreContext);
  const handleChange = (e) => {
    const {checked, name} = e.target;

    dispatch(
      checked ? addFilter(name) : removeFilter(name)
    );
  };

  return (
    <Flex
      as="form"
      flexWrap='wrap'
    >
      {ids.map((name, i) => (
        <Label
          key={`${name}-${i}`}
          my={[1, 1, 0]}
          width={[`50%`, `${midWidth}%`, `${desktopWidth}%`]}
        >
          <Checkbox
            name={name.toLowerCase()}
            onChange={handleChange}
            sx={{
              position: `relative`,
              top: `-4px`,
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
