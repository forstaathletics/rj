import webpack from 'webpack'
import commonConfig from './common.conf'

export default (projectRoot) => {
  const commonCfg = commonConfig(projectRoot)

  return Object.assign(commonCfg, {
    output: Object.assign(commonCfg.output, {
      filename: '[name]-[hash].bundle.js',
      chunkFilename: '[id]-[hash].bundle.js'
    }),

    plugins: commonCfg.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      // new HtmlWebpackPlugin(commonCfg.indexHtml),
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
      loaders: commonCfg.module.loaders.concat([
        {
          test: /\.js|\.jsx$/,
          loaders: ['babel-loader?compact=true'],
          exclude: /node_modules/
        }
      ])
    }
  })
}
