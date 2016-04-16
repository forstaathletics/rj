import webpack from 'webpack'
import commonConfig from './common.conf'
// import HtmlWebpackPlugin from 'html-webpack-plugin'

// var indexHtml = Object.assign(commonConfig.indexHtml, {
//   filename: path.join('..', '..', 'dist', 'index.html')
// })

export default Object.assign(commonConfig, {
  devtool: '#eval-source-map',

  entry: ['webpack-hot-middleware/client', './src/index.js'],

  plugins: commonConfig.plugins.concat([
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true
    }),
    // new HtmlWebpackPlugin(indexHtml),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]),

  module: {
    loaders: commonConfig.module.loaders.concat([
      {
        test: /\.js|\.jsx$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: /node_modules/
      }
    ])
  }
})
