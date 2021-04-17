const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({
    path: path.join(__dirname, '.env')
});

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        }]
    },
    optimization: {
        minimize: true
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        hot: true,
        port: 4000
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": dotenv.parsed
        }),
    ]
};