var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // 정상적인 방법
      // 오른쪽에서 왼쪽으로 순서가 적용된다.
      // sass를 적용하려면 ['style-loader', 'css-loader', 'sass-loader'] 와 같은 순서로 등록한다.
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },

      // css-loader만 적용했을 경우
      // webpack이 css 파일은 읽을 수 있게 되지만, html에 적용이 되지는 않는다.
      // {
      //   test: /\.css$/,
      //   use: ['css-loader']
      // },

      // css-loader 뒤에 style-loader가 오게끔 순서를 변경했을 경우
      // error
      // {
      //   test: /\.css$/,
      //   use: ['css-loader', 'style-loader']
      // },

      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    // *.css 파일을 생성해주는 플러그인
    new MiniCssExtractPlugin() // new instance로 할당
  ],
}
