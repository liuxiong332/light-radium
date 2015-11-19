var path = require('path');
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'lib/__tests__/**/*.js'
    ],
    preprocessors: {
      'lib/__tests__/**/*.js': ['webpack']
    },
    webpack: {
      cache: true,
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }]
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    reporters: ['mocha', 'coverage'],
    browserNoActivityTimeout: 60000,
    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sinon-chai',
      'karma-webpack'
    ],
    coverageReporter: {
      type: 'text'
    },
    captureTimeout: 100000,
    singleRun: true
  });
};
