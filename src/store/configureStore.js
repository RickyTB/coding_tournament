import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'
import {connectRoutes} from 'redux-first-router'

import routesMap from './router/routesMap'
import reducers from './reducers/index'

export default (history, preloadedState) => {
    const {reducer, middleware: routingMiddleware, enhancer, thunk} = connectRoutes(
        history,
        routesMap
    );

    const rootReducer = combineReducers({...reducers, location: reducer});
    const middlewares = applyMiddleware(thunkMiddleware, routingMiddleware);
    const enhancers = composeEnhancers(enhancer, middlewares);
    const store = createStore(rootReducer, preloadedState, enhancers);

    if (module.hot && process.env.NODE_ENV === 'development') {
        module.hot.accept('./reducers/index', () => {
            const reducers = require('./reducers/index').default;
            const rootReducer = combineReducers({...reducers, location: reducer});
            store.replaceReducer(rootReducer);
        })
    }

    return {store, thunk};
}

const composeEnhancers = (...args) =>
    typeof window !== 'undefined'
        ? composeWithDevTools({})(...args)
        : compose(...args);
