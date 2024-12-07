const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.modules = [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname), // Allow imports from the project root
        'node_modules',
      ];
      return webpackConfig;
    },
  },
};