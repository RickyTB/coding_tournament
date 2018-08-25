import React from 'react';
import ReactDOM from 'react-dom/server';
import {Provider} from 'react-redux';
import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Helmet from 'react-helmet';

import configureStore from './configureStore';
import App from '../src/App';

export default ({clientStats}) => async (req, res, next) => {
    const store = await configureStore(req, res);
    if (!store) return; // no store means redirect was already served

    const app = createApp(App, store);
    const appString = ReactDOM.renderToString(app);
    const helmet = Helmet.renderStatic();
    const state = store.getState();
    const stateJson = JSON.stringify(state);
    const chunkNames = flushChunkNames();
    const {js, styles, cssHash} = flushChunks(clientStats, {chunkNames});

    console.log('REQUESTED PATH:', req.path);
    console.log('CHUNK NAMES RENDERED', chunkNames);

    return res.send(
        `<!doctype html>
      <html ${helmet.htmlAttributes.toString()}>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'>
          <meta name="viewport" content="width=device-width">
          <meta name="theme-color" content="#FFFFFF">
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet"> 
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <title>${state.title}</title>
          ${styles}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='/static/vendor.js'></script>
          ${js}
        </body>
      </html>`
    )
}

const createApp = (App, store) =>
    <Provider store={store}>
        <App/>
    </Provider>;
