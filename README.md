# GoodRX Code Challenge

Welcome to the GoodRX code challenge

## Getting Started

This project is dependent on [yarn](https://yarnpkg.com/) so please [install it globally](https://classic.yarnpkg.com/en/docs/install/#mac-stable) on your machine or use the [Docker commands](#running-locally-with-docker):

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
  - I started off wanting to use Styled Components along with [Styled System](https://styled-system.com/). I ended up using Rebass because I wanted a light weight component library that allowed for theming using CSS in JS. Rebass is built upon Emotion and therefore I opted out of Styled Components. Overall, I really enjoyed the theming available in these frameworks and the declarative nature of Rebass but in the future if I had more time would most likely build a complete style guide using Styled Components and Styled System.

### Application Concerns and TODO's
- Potentially modularize the `SearchBar` component.
  - I'm newer to using React Hooks and wasn't completely sure if creating more module components / hooks would work for the `SearchBar`. As is the "loading" state is quite naive and the tests for the `SearchBar` are very monolithic.
- Caching API requests.
  - Again being newer to building custom React Hooks in combination with a "redux like" architechture I was unsure where caching should take place. For example, in the `usePharamcy` hook we are making an HTTP request for every `lat` and `lng` change as well as for every time a checkbox is checked / unchecked. Ideally, we would cache responses either in local or "redux" state and only make requests for request url's that are not in the cache.

### Testing
This app uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to test application. React Testing Library proved to be a great asset in testing components that use asynchronous hooks as [Enzyme](https://airbnb.io/enzyme/) has not yet been updated to work well with React Hooks.

To run tests and watch for changes:
```
yarn test
```

To run tests and exit:
```
yarn test --watchAll=false
```
