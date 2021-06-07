const webpack = require('webpack');
const path = require('path');

const config = {
    entry: [
        './src/client/index.tsx'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    },
    plugins: []
};

if (process.env.NODE_ENV !== 'production') {
    config.entry.unshift('webpack-hot-middleware/client?reload=true')
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

exports.default = config;