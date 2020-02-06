import PropTypes from 'prop-types';
import {Box, Text} from 'rebass';
import React, { memo } from 'react';

const Item = ({children}) => <Text as="p" py={1}>{children}</Text>;

Item.propTypes = {
  children: PropTypes.node
};

const PharmacyListItem = memo(({
  address: {
    city, state, line1, zip_code: zip
  },
  name,
  phone,
}) => (
  <Box
    my={2}
    p={2}
    sx={{
      borderStyle: `solid`,
      borderWidth: `1px`,
      borderColor: `primary`,
    }}
  >
    <Item as="p">{name}</Item>
    <Item as="p">{line1}, {city}, {state} {zip}</Item>
    <Item as="p">{phone}</Item>
  </Box>
));

PharmacyListItem.propTypes = {
  address: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    line1: PropTypes.string,
    zip_code: PropTypes.string,
  }),
  name: PropTypes.string,
  phone: PropTypes.string,
};

export default PharmacyListItem;
