import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import { Provider as ReduxProvider } from './store';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

Object.assign(theme, {
  colors: {
    text: `#000`,
    background: `#fff`,
    primary: `#f9e547`,
    secondary: `#bf1866`,
    muted: `#379683`,
    gray: `#efefef`,
    highlight: `#51A296`,
  },
});

const initialState = {
  filter: [],
  pharmacies: [],
};

const Page = () => (
  <ThemeProvider theme={theme}>
    <Global
      styles={css`
        ${emotionNormalize}
        html,
        body {
          padding: 0;
          margin: 0;
          min-height: 100%;
          font-family: Helvetica, Arial, sans-serif;
        }

        button:focus {outline:0;}
        input:focus: {background-color: transparent !important}
      `}
    />
    <ReduxProvider store={initialState}>
      <App />
    </ReduxProvider>
  </ThemeProvider>
);

ReactDOM.render(<Page />, document.getElementById(`root`));
registerServiceWorker();
