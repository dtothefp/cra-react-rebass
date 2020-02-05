This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Front End Take Home Question
Create a simple React App to display a list of pharmacies using GoodRx API. User should enter a location or click My Location to use Geolocation Web API to get a list of pharmacies. User can also select particular pharmacies from the list of checkboxes to narrow down the results.

API: `https://www.goodrx.com/api/v4/pharmacies`

```
Params: {
  chain_id <number>: one or more
  location <string>: location string or lat_long
}
```

Chain ids:
1 Walmart
2 CVS
3 Walgreens
6 Target
23357 Rite-Aid
20052 Ralphs
93177 Vons
31240 Costco

Example:

```
https://www.goodrx.com/api/v4/pharmacies?chain_id=2&chain_id=6&location=34.018176,-118.497198

https://www.goodrx.com/api/v4/pharmacies?chain_id=2&chain_id=6&location=Los+Angeles,+CA
```

## Fetching Data with AJAX Requests

React doesn't prescribe a specific approach to data fetching, but people commonly use either a library like [axios](https://github.com/axios/axios) or the [`fetch()` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provided by the browser. Conveniently, Create React App includes a polyfill for `fetch()` so you can use it without worrying about the browser support.

The global `fetch` function allows to easily makes AJAX requests. It takes in a URL as an input and returns a `Promise` that resolves to a `Response` object. You can find more information about `fetch` [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

This project also includes a [Promise polyfill](https://github.com/then/promise) which provides a full implementation of Promises/A+. A Promise represents the eventual result of an asynchronous operation, you can find more information about Promises [here](https://www.promisejs.org/) and [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Both axios and `fetch()` use Promises under the hood. You can also use the [`async / await`](https://davidwalsh.name/async-await) syntax to reduce the callback nesting.

You can learn more about making AJAX requests from React components in [the FAQ entry on the React website](https://reactjs.org/docs/faq-ajax.html).
