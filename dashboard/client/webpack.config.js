const path = require("path");
const htmlWebPackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const ENTRY_FILE = "manager.js";
const SERVICE_WORKER = "service.js";
const SRC_DIR = "./client";
const OUT_DIR = "./public";
const OUPUT_FILE = "[name].bundle.js";


function setDevelopment(webpackConfig) {
  return merge(webpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new htmlWebPackPlugin({
        isDevelopment: true,
        template: "./client/templates/index.hbs",
        chunks: [
          "manager"
        ],
      }),
    ],
  });
}

function setProduction(webpackConfig) {
  return merge(webpackConfig, {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
      ],
    },
    plugins: [
      new htmlWebPackPlugin({
        isDevelopment: false,
        minify: true,
        template: "./client/templates/index.hbs",
        chunks: [
          "manager"
        ],
      }),
    ],
  });
}



module.exports = () => {
  const webpackConfig = {
    entry: {
      manager: path.resolve(__dirname, SRC_DIR, ENTRY_FILE),
      service: path.resolve(__dirname, SRC_DIR, SERVICE_WORKER),
    },
    module: {
      rules: [{
        test: /\.hbs$/,
        loader: "handlebars-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }], // rules
    },
    output: {
      path: path.resolve(__dirname, OUT_DIR),
      filename: OUPUT_FILE,
      pathinfo: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
        contentBase: path.join(__dirname, OUT_DIR),
        compress: true,
        port: 8080
    },
  };

  if( process.env.NODE_ENV === 'development' ) {
    console.log(`Development build detected: NODE_ENV="${process.env.NODE_ENV}"`);
    return setDevelopment(webpackConfig);
  }

  console.log(`Production build detected: NODE_ENV="${process.env.NODE_ENV}"`);
  return setProduction(webpackConfig);
}
