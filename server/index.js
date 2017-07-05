const environment = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: 'envs/.env.' + environment });

require('babel-core/register');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVTOOLS__ = process.env.DEVTOOLS;
global.__LOGGER__ = process.env.LOGGER;
global.__DEVELOPMENT__ = process.env.DEVELOPMENT;
global.__SSR__ = process.env.SSR;

global.__APP_PROTOCOL__ = process.env.APP_PROTOCOL;
global.__APP_HOST__ = process.env.APP_HOST;
global.__APP_PORT__ = process.env.APP_PORT;
global.__APP_MOCK_PORT__ = process.env.APP_MOCK_PORT;

global.__API_PROTOCOL__ = process.env.API_PROTOCOL;
global.__API_HOST__ = process.env.API_HOST;
global.__API_PORT__ = process.env.API_PORT;

global.__PLAID_CLIENT_NAME__ = process.env.PLAID_CLIENT_NAME;
global.__PLAID_ENV__ = process.env.PLAID_ENV;
global.__PLAID_PUBLIC_KEY__ = process.env.PLAID_PUBLIC_KEY;

global.__WORTHFM_LANDING__ = process.env.WORTHFM_LANDING;

const path = require('path');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicTools = new WebpackIsomorphicTools(
  require('../webpack/isomorphic.config')
);

global.isomorphicTools = isomorphicTools
  .server(path.resolve(__dirname, '..'), () => {
    require('../server/server.' + environment + '.js');
  });