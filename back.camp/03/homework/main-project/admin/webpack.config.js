const path = require('path');
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        // 번들 파일(bundle)의 시작 파일(Entry)을 jsx에서 tsx로 변경
        'js/app': ['./src/index.tsx'],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            // Webpack(웹팩)에서 Typescript(타입스크립트)를 사용하기 위해 js|jsx를 ts|tsx로 수정 후 ts-loader를 추가
            // ts-loader의 옵션은 성능 향상을 위해서
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                            ],
                        },
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: path.join(__dirname, '.env'),
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
        new ForkTsCheckerWebpackPlugin(),
    ],
    devServer: {
        port: 3002,
        open: true,
        hot: true,
    },
    devtool: 'eval-source-map',
    mode: 'development',
};
