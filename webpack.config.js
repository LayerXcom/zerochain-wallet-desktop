const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');

const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
  path: './dist/main/index.js',
});


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
    },{
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: "[name].[ext]",
                outputPath: './webfonts',
                publicPath: '../webfonts',
            },
        }],
    }]
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
            filename: 'src/css/index.scss'
        }),
        ElectronReloadWebpackPlugin()
    ]
}]
