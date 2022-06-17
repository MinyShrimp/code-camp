const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// BundleAnalyzer는 Bundle 최적화 용도로 보통 저는 사용합니다.

module.exports = {
    entry: `${path.resolve(__dirname, '../src')}/index.tsx`,
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${path.resolve(__dirname, '../src/public')}/index.html`,
        }),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new Dotenv({
            path: `.env`,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '..src/'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
        },
    },
};
