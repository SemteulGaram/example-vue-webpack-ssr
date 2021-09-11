const VueLoaderPlugin = require("vue-loader/lib/plugin")
const { merge } = require("webpack-merge")
const clientConfig = require("./config/client")
const serverConfig = require("./config/server")

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
  ]
}

module.exports = __opt => {
  const modeIdx = process.argv.indexOf("--mode")
  const mode = process.argv[modeIdx+1] || 'development';
  if (mode === "development") {
    return merge(commonConfig, clientConfig, {mode})
  } else { // if (mode === "production")
    return merge(commonConfig, serverConfig, {mode})
  }
}
