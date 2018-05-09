const path = require('path');
const webpack = require('webpack');
const appDirectory = path.resolve(__dirname, './');

const tsLoaderConfiguration = {
    test: [/\.tsx?$/],
    include: [
        path.resolve(appDirectory, 'src'),
   ],
    use: [
        {
            loader: 'ts-loader'
        }
    ]
};

const babelLoaderConfiguration = {
    test: /\.(js|jsx|mjs)$/,
    include: [
        path.resolve(appDirectory, 'src'),
        // A lot of React Native libs are not compiled down to ES5, which means webpack can't load them.
        // If you get webpack module resolution errors when doing `npm run start:web`,
        // add the offending packages to this array.
        path.resolve(appDirectory, 'node_modules', 'react-native'),
        path.resolve(appDirectory, 'node_modules', 'react-navigation'),
        path.resolve(appDirectory, 'node_modules', 'react-navigation-redux-helpers'),
        path.resolve(appDirectory, 'node_modules', 'react-native-safe-area-view')
    ],
    loader: require.resolve('babel-loader'),
    options: {
        cacheDirectory: true
    }
};

const cssLoaderConfiguration = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
};

const imageLoaderConfiguration = {
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
        loader: 'url-loader',
        options: {
            name: '[name].[ext]'
        }
    }
};

module.exports = {
    // your web-specific entry file
    entry: path.resolve(appDirectory, 'src/index.tsx'),
    output: {
        filename: 'bundle.js',
        publicPath: '/assets/',
        path: path.resolve(appDirectory, './public/assets')
    },
    module: {
        rules: [
            tsLoaderConfiguration,
            babelLoaderConfiguration,
            cssLoaderConfiguration,
            imageLoaderConfiguration
        ]
    },
    plugins: [
        // process.env.NODE_ENV === 'production' must be true for production
        // builds to eliminate development checks and reduce build size. You may
        // wish to include additional optimizations.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            __DEV__: process.env.NODE_ENV === 'production' || true
        }),
        new webpack.NamedModulesPlugin()
    ],
    resolve: {
        // If you're working on a multi-platform React Native app, web-specific
        // module implementations should be written in files using the extension
        // '.web.js'.
        extensions: ['.web.js', '.js', '.tsx', '.ts', '.json'],
        alias: {
            'react-native': 'react-native-web'
        },
        modules: [path.resolve('./'), path.resolve('./node_modules')]
    }
};
