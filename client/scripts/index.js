import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { trigger } from 'redial';
import { browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { withAsyncComponents } from 'react-async-component';

import configureStore from '../../common/configureStore';
import configureReducers from './reducers/index';
import configureRoutes from '../../common/routes';

import Root from './containers/Root';

import '../styles/index.css';

const reducers = configureReducers();
const store = configureStore(browserHistory, reducers, window.__INITIAL_STATE__);
const routes = configureRoutes(store);

const history = syncHistoryWithStore(browserHistory, store);
const reactRoot = document.getElementById('root');

const renderApp = (AppRoot) => {
  const { dispatch, getState } = store;

  match({ routes, location }, () => {
    const App = <AppRoot store={store} routes={routes} history={history} />;

    withAsyncComponents(App).then(({ appWithAsyncComponents: AppWithAsyncComponents }) => {
      ReactDOM.render(AppWithAsyncComponents, reactRoot);

      if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes
        || !reactRoot.firstChild.attributes['data-react-checksum']) {
        console.error(// eslint-disable-line no-console
          `Server-side React render was discarded. Make sure that your
          initial render does not contain any client-side code.`,
        );
      }

      if (__DEVELOPMENT__) {
        window.React = React; // enable debugger
        window.Perf = require('react-addons-perf'); // eslint-disable-line global-require
      }
    });
  });

  return history.listen((location) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      const { components } = renderProps;

      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        dispatch,
        getState,
      };

      if (window.__INITIAL_STATE__) {
        delete window.__INITIAL_STATE__;
      } else {
        trigger('fetch', components, locals);
      }

      trigger('defer', components, locals);
    });
  });
};

if (__DEVELOPMENT__ && module.hot) {
  const hotReloadRoutes = require('./utils/hotReloadRoutes'); // eslint-disable-line global-require

  module.hot.accept([
    './containers/Root',
    '../../common/routes',
  ], () => {
    const nextRoot = require('./containers/Root'); // eslint-disable-line global-require
    const nextRoutes = require('../../common/routes')(store); // eslint-disable-line global-require

    // TODO: recheck, works only once, mb use react-router4(but on this moment alpha)
    hotReloadRoutes(routes, nextRoutes);

    renderApp(nextRoot);
  });
}

renderApp(Root);
