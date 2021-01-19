// import  from node modules
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: ["webpack/hot/dev-server", "/src/index.tsx"],
  resolve: {
    extensions: [".js", ".tsx"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "/src/index.html"),
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
}
