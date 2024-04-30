const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/src/index.js",
  mode: process.env.NODE_ENV,

  output: {
    path: path.join(__dirname, "./build"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./client/public/index.html"),
      filename: "./index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", "..."],
  },
  devServer: {
    host: "localhost",
    port: 3000,
    static: {
      publicPath: "/",
      directory: path.join(__dirname, "/build"),
    },
    proxy: [{ context: ["/api"], target: "http://localhost:8080" }],
  },
};
