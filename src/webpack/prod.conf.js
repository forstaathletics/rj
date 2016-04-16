import webpack from 'webpack'
import commonConfig from './common.conf'

export default Object.assign(commonConfig, {
  output: Object.assign(commonConfig.output, {
    filename: '[name]-[hash].bundle.js',
    chunkFilename: '[id]-[hash].bundle.js'
  }),

  plugins: commonConfig.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new HtmlWebpackPlugin(commonConfig.indexHtml),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      minimize: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    })
  ]),

  module: {
    loaders: commonConfig.module.loaders.concat([
      {
        test: /\.js|\.jsx$/,
        loaders: ['babel-loader?compact=true'],
        exclude: /node_modules/
      }
    ])
  }
})
