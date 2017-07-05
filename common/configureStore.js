import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

export default function configureStore(history, reducers, initialState = {}) {
  const middleware = [
    thunk,
    promiseMiddleware({
      promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    }),
    routerMiddleware(history)
  ];
  
  let finalCreateStore;

  if (__CLIENT__ && __DEVELOPMENT__) {
    if (__LOGGER__) {
      const createLogger = require('redux-logger');

      const logger = createLogger();
      middleware.push(logger);
    }

    if (__DEVTOOLS__) {
      finalCreateStore = compose(
        applyMiddleware(...middleware),
        global.devToolsExtension ? global.devToolsExtension() : f => f
      )(createStore);
    }
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  const store = finalCreateStore(reducers, initialState);
  store.asyncReducers = {};
  store.setOnServer = false;

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../client/scripts/reducers', () => {
      store.replaceReducer(require('../client/scripts/reducers/index'));
    });
  }
  
  return store;
}
