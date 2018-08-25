const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../../webpack/client.dev');
const serverConfig = require('../../webpack/server.dev');

module.exports = function (app) {
    const DEV = process.env.NODE_ENV === 'development';
    const publicPath = clientConfig.output.publicPath;
    const outputPath = clientConfig.output.path;

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

    if (DEV) {
        const multiCompiler = webpack([clientConfig, serverConfig]);
        const clientCompiler = multiCompiler.compilers[0];

        app.use(app.loopback.static('public'));

        app.use(webpackDevMiddleware(multiCompiler, {publicPath}));
        app.use(webpackHotMiddleware(clientCompiler));
        app.use(
            // keeps serverRender updated with arg: { clientStats, outputPath }
            webpackHotServerMiddleware(multiCompiler, {
                serverRendererOptions: {outputPath}
            })
        );
    } else {
        const clientStats = require('../../buildClient/stats.json'); // eslint-disable-line import/no-unresolved
        const serverRender = require('../../buildServer/main.js').default; // eslint-disable-line import/no-unresolved

        app.use(app.loopback.static('public'));

        app.use(publicPath, app.loopback.static(outputPath));
        app.use(serverRender({clientStats, outputPath}));
    }
};
