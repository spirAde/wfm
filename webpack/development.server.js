require('dotenv').config({ path: 'envs/.env.development' });

import webpack from 'webpack';

import webpackConfig from '../webpack/development.config';

import WebpackDevServer from 'webpack-dev-server';

const compiler = webpack(webpackConfig);

const host = process.env.APP_HOST;
const port = parseInt(process.env.APP_PORT) + 1;

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true,
  stats: { colors: true },
};

new WebpackDevServer(compiler, serverOptions).listen(port, () => {
  console.info('Webpack development server listening on port %s', port);
});
