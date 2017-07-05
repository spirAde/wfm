const postCSSConfig = [
  require('postcss-import'),
  require('postcss-cssnext')({
    browsers: [
      'last 2 versions',
      'IE >= 11',
    ],
    features: {
      autoprefixer: false,
    },
  }),
  require('precss'),
  require('postcss-short'),
  require('css-mqpacker'),
  require('postcss-focus'),
  //require('postcss-csso'),
  require('cssnano'),
];

if (process.env.NODE_ENV !== 'production') {
  /*postCSSConfig.unshift(require('stylelint'));
  postCSSConfig.push(
    require('stylelint')({
      selector: 'body:before',
    })
  );*/
}

module.exports = postCSSConfig;