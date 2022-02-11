// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
 module.exports = {
    publicPath: '/app/',
    outputDir: 'extension/app/',
    configureWebpack: {
        devtool: 'cheap-module-source-map'
      }
  }