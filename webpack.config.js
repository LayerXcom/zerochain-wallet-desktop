const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = {
    extensions: [
        '.ts',
        '.tsx',
        '.js',
    ]
};

const module_settings = {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader'
    }, {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
            configFile: './tslint.json',
            typeCheck: true,
        },
    }, {
        test: /(\.s[ac]ss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
    }, {
        test: /\.html$/,
        loader: "html-loader"
    }],
};

module.exports = [{
    target: 'electron-main',
    entry: './src/main/index.js',
    output: {
        filename: 'main/index.js'
    },
    mode: "development",
    resolve: resolve,
    module: module_settings,
    }, {
    target: 'electron-renderer',
    entry: './src/renderer/index.tsx',
    output: {
        filename: 'renderer/index.js'
    },
    mode: "development",
    resolve: resolve,
    module: module_settings,
    externals: {
        'zerochain': `require('${__dirname}/zerochain')`
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'dist/bundle.css'
        })
    ]
}]
