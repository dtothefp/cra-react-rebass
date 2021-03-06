import React, { useContext } from 'react';
import { Box } from 'rebass';
import { StoreContext } from '../../store';
import PharmacyListItem from '../PharmacyListItem/PharmacyListItem';

const PharmacyList = () => {
  const {state: {pharmacies = []}} = useContext(StoreContext);

  return (
    <Box>
      {pharmacies.map(({phone_number, name, address}, i) => (
        <PharmacyListItem
          address={address}
          name={name}
          phone={phone_number}
          key={`${name}-${phone_number}-${i}`}
        />
      ))}
    </Box>
  );
}

export default PharmacyList;
