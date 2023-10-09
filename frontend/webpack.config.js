const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.frontend",
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].min.frontend",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            }
        ],
    },
    optimization: {
        minimize: true,
    }
};