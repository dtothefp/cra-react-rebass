# GoodRX Code Challenge

Welcome to the GoodRX code challenge

## Getting Started

This project is dependent on [yarn](https://yarnpkg.com/) so please [install it globally](https://classic.yarnpkg.com/en/docs/install/#mac-stable) on your machine or use the Docker commands

### Running Locally
Install all dependencies
```
yarn
```

Start a local dev server with hot reloading and serve port 3000 => `http://localhost:3000`
```
yarn start
```

Bundle and optimize all static assets and serve port 3000 => `http://localhost:3000`
```
yarn build
yarn serve
```

### Running Locally With Docker
Start a local dev server with hot reloading and serve port 3000 => `http://localhost:3000`
```
docker-compose -f docker-compose.override.yml up app
```

Bundle and optimize all static assets and serve on port 80 with NGINX => `http://localhost`
```
docker-compose -f docker-compose.yml up app
```

### Technologies Utilized
- [Create React App](https://create-react-app.dev/)
  - This boilerplate was provided with the challenge although I updated it to the latest version in order to utilize [React Hooks](https://reactjs.org/docs/hooks-intro.html).
- [Rebass](https://rebassjs.org/) / [Emotion](https://emotion.sh/docs/introduction) / [Styled Components](https://styled-components.com/)
  - I started off wanting to use Styled Components along with [Styled System](https://styled-system.com/). I ended up using Rebass because I wanted a light weight component library that allowed for theming using CSS in JS. Rebass is built upon Emotion and therefore I opted out of Styled Components but ended up having to use this in one place in the app for keyframe animations. This is not ideal because both Emotion and Styled Components must be bundled. Overall, I really enjoyed the theming available in these frameworks and the declarative nature of Rebass but in the future if I had more time would most likely build a complete style guide using Styled Components and Styled System.

### Application Concerns and TODO's
- Potentially modularize the `SearchBar` component.
  - I'm newer to using Hooks and wasn't completely sure if creating more module components / hooks would work for the `SearchBar`. As is the "loading" state is quite naive and the tests for the `SearchBar` are very monolithic.

### Testing
This app uses [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/) to test the client side application as well as using Jest to test the server application.

To run tests
```
yarn test
```


