var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        './app/index.js'
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        },
        { 
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    debug: true,
    devtool: 'eval',
    output: {
        path: 'dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};