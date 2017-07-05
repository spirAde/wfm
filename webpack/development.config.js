require('dotenv').config({ path: 'envs/.env.development' });

const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const HappyPack = require('happypack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const isomorphicTools = new WebpackIsomorphicToolsPlugin(require('./isomorphic.config'));
const SvgStore = require('webpack-svgstore-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const host = (process.env.APP_HOST || 'localhost');
const port = parseInt(process.env.APP_PORT) + 1 || 3001;

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://' + host + ':' + port + '/',
    'webpack/hot/only-dev-server',
    './client/scripts/index.js',
  ],
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/build/',
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'client',
      'node_modules',
      'common'
    ],
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    noParse: [
      /node_modules\/redux-segment/,
    ],
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&camelCase!postcss?parser=postcss-scss'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=jsx',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [path.join(__dirname, '..', 'client'), path.join(__dirname, '..', 'common')],
      },
      { test: /\.json/, loader: 'json' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/png' },
      // { test: isomorphicTools.regular_expression('images'), loader: 'url-loader?limit=10240' },
    ]
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    tap: 'empty',
    module: 'empty',
  },
  postcss: function() { return require('./postcss.config') },
  plugins: [
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: ['babel']
    }),
    new SvgStore.Options({
      svg: {
        style: 'display: none;',
      },
      svgoOptions: {
        plugins: [
          { removeTitle: true },
        ],
      },
      prefix: 'icon-',
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-assets\.json$/),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    /*new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),*/
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      __API_HOST__: JSON.stringify(process.env.API_HOST || 'dev.worthfm.com'),
      __API_PORT__: JSON.stringify(process.env.API_PORT),
      __API_PROTOCOL__: JSON.stringify(process.env.API_PROTOCOL || 'https'),
      __APP_HOST__: JSON.stringify(process.env.APP_HOST || 'localhost'),
      __APP_PORT__: JSON.stringify(process.env.APP_PORT || 3000),
      __APP_MOCK_PORT__: JSON.stringify(process.env.APP_MOCK_PORT || 4000),
      __APP_PROTOCOL__: JSON.stringify(process.env.APP_PROTOCOL || 'http'),
      __CLIENT__: true,
      __DEVELOPMENT__: true,
      __PLAID_PUBLIC_KEY__: JSON.stringify(process.env.PLAID_PUBLIC_KEY || 'test_key'),
      __PLAID_ENV__: JSON.stringify(process.env.PLAID_ENV || 'tartan'),
      __PLAID_CLIENT_NAME__: JSON.stringify(process.env.PLAID_CLIENT_NAME || 'WorthFM'),
      __SERVER__: false,
      __DEVTOOLS__: JSON.stringify(JSON.parse(process.env.DEVTOOLS || 'false')),
      __LOGGER__: JSON.stringify(JSON.parse(process.env.LOGGER || 'false')),
      __APP_RESOURCES_URL__: JSON.stringify(process.env.APP_RESOURCES_URL || 'https://dev.worthfm.com'),
      __SEGMENT_WRITE_KEY__: JSON.stringify(process.env.SEGMENT_WRITE_KEY || 'supersecure'),
      __WORTHFM_LANDING__: JSON.stringify(process.env.WORTHFM_LANDING || 'http://worthfm.com'),
    }),
    /*new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),*/
    //new BundleAnalyzerPlugin(),
    isomorphicTools.development()
  ]
};