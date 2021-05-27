const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const path = require('path');
const webpack = require('webpack');

// less-vars-to-js does not resolve imports so we need to combine these files manually here
const antdOverrides = lessToJs(fs.readFileSync(path.join(__dirname, '../../app/styles/ant-default-vars.less'), 'utf8'));

const wismoColors = lessToJs(fs.readFileSync(path.join(__dirname, '../../app/styles/themes/colors.less'), 'utf8'));
const wismoFonts = lessToJs(fs.readFileSync(path.join(__dirname, '../../app/styles/themes/fonts.less'), 'utf8'));

const themeVariables = {
  ...wismoColors,
  ...wismoFonts,
  ...antdOverrides,
};

module.exports = (options) => ({
  devServer: options.devServer,

  devtool: options.devtool,

  entry: [
    require.resolve('react-app-polyfill/ie11'),
    require.resolve('react-app-polyfill/stable'),
    path.resolve('app/index.tsx'),
  ],

  mode: options.mode,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)\/(?!(react-intl))/,
        include: [path.resolve('node_modules/react-intl')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.less$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: themeVariables,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // fork-ts-checker-webpack-plugin is used for type checking
              logLevel: 'info',
            },
          },
        ],
      },
    ],
  },

  optimization: options.optimization,

  output: {
    path: path.resolve('build/'),
    ...options.output,
  },

  performance: options.performance,

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    ...options.plugins,
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', 'app'],
  },

  target: 'web', // Make web variables accessible to webpack, e.g. window
});
