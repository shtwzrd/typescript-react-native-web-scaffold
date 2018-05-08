import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {EnhancerOptions} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools, RemoteReduxDevToolsOptions} from 'remote-redux-devtools';
import navReducer from 'src/state/ducks/native-navigation/reducer';

const reducerMap = {
    navigation: navReducer
};

// AppState is the keys of the reducerMap, with the values returned by each key's respective reducer
export type AppState = {[K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>};

export const reducers = combineReducers<AppState>(reducerMap);

export const composeStore = () => {
    const devToolOpts: EnhancerOptions = {
        serialize: true,
        shouldHotReload: true
    };
    const reduxLogger = createLogger({});
    const composeEnhancers = composeWithDevTools(devToolOpts as RemoteReduxDevToolsOptions);

    const reactNav = createReactNavigationReduxMiddleware('root', (state: AppState) => state.navigation);
    return createStore(
        reducers,
        composeEnhancers(applyMiddleware(thunk), applyMiddleware(reactNav), applyMiddleware(reduxLogger))
    );
};
