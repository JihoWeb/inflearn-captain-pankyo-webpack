var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/', // CDN 관련 설정
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        // CSS 파일을 Webpack이 인식할 수 있도록 설정
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        // ES6 polyfill config
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ // 바벨이 굳이 node_modules 디렉토리까지 변환하지 않게 설정
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  // Webpack이 인식할 수 있게 도와주는 설정
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    // 확장자 안 붙여도 인식하게끔 설정
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

// 배포 시에 추가적인 기능을 추가하는 부분
// 그러나 Webpack 3 기준이다.
// Webpack 4부터는 mode 설정이 production이기만 하면 자동적으로 수행하는 내용이라고 보면 된다.
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
