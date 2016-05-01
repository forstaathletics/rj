import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import precss from 'precss'
import calcFunction from 'postcss-calc'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// TODO(jeff) accept the app config, not just the root
export default (projectRoot) => {
  // TODO(jeff) get these values from the app config
  let envExports = [
    'PARSE_APP_ID', 'PARSE_JS_KEY', 'PARSE_SERVER_URL',
    'FACEBOOK_APP_ID', 'STRIPE_CLIENT_KEY', 'USPS_API_UNAME',
    'USPS_API_SECURE_HOST', 'USPS_API'
  ]

  let indexHtml = {
    inject: 'body',
    hash: false,
    // favicon: 'dist/static/img/favicon.ico',
    template: path.join(projectRoot, 'src', 'index.tmpl.html'),
    filename: path.join(projectRoot, 'dist', 'index.html')
  }

  let wpCfg = {
    // Create a bundle named main.js for our entry point at `src/index.js`
    // Create a vendor bundle that has the bulk or all of our library/dependencies
    // in it.
    entry: {
      main: path.join(projectRoot, 'src', 'index.js'),
      vendors: ['react', 'react-dom', 'react-redux',
        'react-router', 'react-router-redux', 'immutable',
        'redux', 'redux-promise', 'redux-actions'
      ]
    },

    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[id].bundle.js',
      path: path.join(projectRoot, 'dist', 'static'),
      publicPath: '/static/'
    },

    resolve: {
      root: [
        path.join(projectRoot, 'src'),
        path.join(projectRoot, 'src', 'pods'),
        path.join(projectRoot, 'node_modules')
      ],
      extensions: ['', '.jsx', '.js', '.json', '.css'],
      modulesDirectories: ['node_modules', 'src', 'src/pods']
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': envExports.reduce(
          (p, v) => {
            p[v] = JSON.stringify(process.env[v])
            return p
          }, {})
      }),
      new HtmlWebpackPlugin(indexHtml),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    ],

    module: {
      loaders: [
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff2'
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
          test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-otf'
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        }, {
          // Inline images smaller than 5K, otherwise got to the network
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=5120,name=img/img-[hash:6].[ext]'
        }, {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader'
        }
      ]
    },

    postcss: [
      autoprefixer,
      precss,
      calcFunction({mediaQueries: true, warnWhenCannotResolve: true})
    ]

    // node: {
    //   fs: 'empty',
    //   'child_process': 'empty'
    // }
  }

  return wpCfg
}
