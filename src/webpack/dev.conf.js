var path = require('path')
import webpack from 'webpack'
import commonConfig from './common.conf'

export default (projectRoot) => {
  const commonCfg = commonConfig(projectRoot)

  return Object.assign(commonCfg, {
    devtool: '#eval-source-map',

    entry: ['webpack-hot-middleware/client', './src/index.js'],

    plugins: commonCfg.plugins.concat([
      new webpack.DefinePlugin({
        __DEVELOPMENT__: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]),

    module: {
      loaders: commonCfg.module.loaders.concat([
        {
          test: /\.js|\.jsx$/,
          loaders: ['react-hot', 'babel-loader'],
          exclude: /node_modules/
        }
      ])
    }
  })
}
