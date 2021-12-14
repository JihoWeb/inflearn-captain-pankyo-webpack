# Webpack

### Command

* package.json

```json
  "scripts": {
    "build": "webpack --mode=none"
  }
```

위처럼 webpack 명령어를 담아 사용하면 `npm run build` 명령어로 번들링을 수행할 수 있다.

```sh
webpack --mode=none
```

- mode
  - `none`: 빌드 결과물을 그나마 알아볼 수 있는 형태로 번들링하는 모드
  - `production`
  - `development`

> - mode 설정이 없을 경우 webpack 명령 수행 시 warning이 나온다.
> - mode를 `none`으로 설정했을 경우 모듈 번들링이 어떻게 되었는지 어느 정도 구분할 수 있다.
> - 결과는 ***IIFE***(Immediately Invoked Function Expression) 방식으로 되어 있어 즉시 실행 함수로 변환된다.

---

### webpack.config.js

```sh
webpack --mode=none --entry=src/index.js --output=public/output.js
```

위처럼 package.json에 담으면 사용할 수 있지만 보통 `webpack.config.json`에 정의한다.

```js
var path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### Goals

- #### Module Management
- #### Web Task Manager
- #### High Speed Loading & Performance

### TODO

- JS 변수 유효 범위
- 브라우저별 HTTP 요청 숫자의 제약
- 사용하지 않는 코드의 관리
- Dynamic Loading & Lazy Loading 미지원

---

### Webpack Proprties 4

1. #### entry
2. #### output
3. #### loader
4. #### plugin

![Concepts](https://joshua1988.github.io/webpack-guide/assets/img/diagram.519da03f.png)

### Entry

> Webpack에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 JS 파일 경로

```js
entry: {
  login: './src/LoginView.js',
  main: './src/MainView.js'
}
```

### Output

> Webpack 명령을 수행하고 난 결과물의 파일 경로

```js
module.exports = {
  output: {
    filename: '[name].bundle.js'
  }
};

module.exports = {
  output: {
    filename: '[id].bundle.js'
  }
};

module.exports = {
  output: {
    filename: '[name].[hash].bundle.js'
  }
};

module.exports = {
  output: {
    filename: '[chunkhash].bundle.js'
  }
};
```

### Loader

> Webpack이 웹앱을 해석할 때 JS 파일이 아닌 웹 자원들을 변환할 수 있도록 도와주는 속성

```js
module.exports = {
  module: {
    rules: []
  }
}

// CSS Loader Test
rules: [
  // 정상적인 방법
  // 오른쪽에서 왼쪽으로 순서가 적용된다.
  // sass를 적용하려면 ['style-loader', 'css-loader', 'sass-loader'] 와 같은 순서로 등록한다.
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },

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
]
```

### Plugin

> Webpack의 기본적인 동작에 추가적인 기능을 제공하는 속성

> Loader는 파일을 해석하고 변환하는 과정에 관여하고, Plugin은 해당 결과물의 형태를 바꾸는 역할을 수행한다.

```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
}
```

