/*
 * Created with React Create App
 * https://github.com/facebook/create-react-app
*/

import React, { Component } from "react";
import { Box, Heading } from 'rebass';
import FilterBox from '../FilterBox/FilterBox';
import SearchBar from '../SearchBar/SearchBar';
import PharmacyList from '../PharmacyList/PharmacyList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Box
          as="header"
          bg="primary"
          color="text"
          p={4}
          sx={{
            textAlign: `center`
          }}
        >
          <Heading
            fontSize={[ 3, 4 ]}
            color="text"
          >
            Welcome to GoodRx
          </Heading>
        </Box>
        <Box
          my={5}
          mx="auto"
          width="80%"
        >
          <SearchBar />
          <FilterBox />
          <PharmacyList />
        </Box>
      </div>
    );
  }
}

export default App;
