const path = require("path")

module.exports = {
  entry: "./src/create-app",

  target: "node",
  
  output: {
    libraryTarget: "commonjs2"
  }
}
