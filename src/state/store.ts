import {Platform} from 'react-native';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import * as ReduxDevTools from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import * as RemoteReduxDevTools from 'remote-redux-devtools';
import {default as navReducer} from 'src/state/ducks/native-navigation';

const reducerMap =
    Platform.OS === 'web'
        ? {
              navigation: () => null
          }
        : {
              navigation: navReducer
          };

// AppState is the keys of the reducerMap, with the values returned by each key's respective reducer
export type AppState = {[K in keyof typeof reducerMap]: ReturnType<typeof reducerMap[K]>};

export const reducers = combineReducers<AppState>(reducerMap);

export const composeStore = () => {
    const devToolOpts: ReduxDevTools.EnhancerOptions & RemoteReduxDevTools.RemoteReduxDevToolsOptions = {
        serialize: true,
        shouldHotReload: true
    };
    const reduxLogger = createLogger({});
    const composeEnhancers =
        Platform.OS === 'web'
            ? ReduxDevTools.composeWithDevTools(devToolOpts)
            : RemoteReduxDevTools.composeWithDevTools(devToolOpts);

    const middlewares = [applyMiddleware(thunk), applyMiddleware(reduxLogger)];

    if (Platform.OS !== 'web') {
        middlewares.push(
            applyMiddleware(createReactNavigationReduxMiddleware('root', (state: AppState) => state.navigation!))
        );
    } else {
        // web-specific middlewares go here
    }
    return createStore(reducers, composeEnhancers(...middlewares));
};

export const store = composeStore();
