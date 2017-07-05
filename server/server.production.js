import path from 'path';

import express from 'express';
import PrettyError from 'pretty-error';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, createMemoryHistory, RouterContext } from 'react-router';
import { trigger } from 'redial';
import { syncHistoryWithStore } from 'react-router-redux';
import { withAsyncComponents } from 'react-async-component';
import bowser from 'bowser';

import Root from './root.jsx';
import configureStore from '../common/configureStore';
import configureReducers from '../client/scripts/reducers/index';
import configureRoutes from '../common/routes';

import { checkDevice } from '../client/scripts/actions/application';

const { DEVELOPMENT, SSR, LOGGER, DEVTOOLS, APP_PROTOCOL, APP_HOST, APP_PORT } = process.env;

const pretty = new PrettyError();
const app = express();

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  const isMobile = !!bowser._detect(req.headers['user-agent']).mobile;
  const reducers = configureReducers();
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory, reducers);
  const { dispatch, getState } = store;

  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      renderToString(
        <Root
          assets={isomorphicTools.assets()}
          store={store}
        />
      )
    );
  }

  if (!__SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: configureRoutes(store), location: req.originalUrl },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500);
        hydrateOnClient();
      } else if (renderProps) {
        const { components } = renderProps;

        // detect device mobile/desktop on server-side
        dispatch(checkDevice(isMobile));

        // Define locals to be provided to all lifecycle hooks:
        const locals = {
          path: renderProps.location.pathname,
          query: renderProps.location.query,
          params: renderProps.params,

          // Allow lifecycle hooks to dispatch Redux actions:
          dispatch,
          getState
        };

        trigger('fetch', components, locals)
          .then(() => {
            const component = (
              <Provider store={store} key="provider">
                <RouterContext {...renderProps} />
              </Provider>
            );

            withAsyncComponents(component).then(result => {
              const {
                appWithAsyncComponents,
                state: asyncComponentsState,
                STATE_IDENTIFIER
              } = result;

              const assets = isomorphicTools.assets();

              console.log(renderToString(
                <Root
                  assets={assets}
                  component={appWithAsyncComponents}
                  store={store}
                  asyncComponentsState={asyncComponentsState}
                  asyncComponentsStateIdentifier={STATE_IDENTIFIER}
                />
              ));

              res.status(200).send('<!doctype html>\n' +
                renderToString(
                  <Root
                    assets={assets}
                    component={appWithAsyncComponents}
                    store={store}
                    asyncComponentsState={asyncComponentsState}
                    asyncComponentsStateIdentifier={STATE_IDENTIFIER}
                  />
                )
              );
            });
          })
          .catch(error => pretty.render(error));
      } else {
        res.status(404).send('Not found');
      }
    });
});

app.listen(APP_PORT, () => {
  console.log(`DEVELOPMENT - ${DEVELOPMENT}`);
  console.log(`SSR - ${SSR}`);
  console.log(`DEVTOOLS - ${DEVTOOLS}`);
  console.log(`LOGGER - ${LOGGER}`);
  console.log(`Web server listening at: ${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`);
});
