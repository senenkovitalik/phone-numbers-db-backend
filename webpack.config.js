const path = require("path");
const nodeExternals = require("webpack-node-externals");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/index.ts",
  mode: NODE_ENV,
  target: "node",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    clean: true,
  },
  plugins: [
    new ESLintPlugin({
      extensions: ["js", "ts"],
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/public", to: "public" },
        { from: "./src/views", to: "views" },
      ],
    }),
  ],
};
