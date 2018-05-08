// Entry-point for React Native
// Do not move or rename
import React, {Component} from 'react';
import {BackHandler, Platform} from 'react-native';
import Navigation, {addNavigationHelpers} from 'react-navigation';
import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import {connect, Provider} from 'react-redux';
import {Dispatch} from 'redux';
import {NativeAppRootNavigator} from 'src/state/ducks/native-navigation';
import {AppState, composeStore} from 'src/state/store';

const store = composeStore();
const boundListener = createReduxBoundAddListener('root');

class NativeApp extends Component<{dispatch: Dispatch<AppState>; navigation: Navigation.NavigationState}> {
    public componentWillMount() {
        // set up handling for Android back button
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', () => {
                const {dispatch} = this.props;
                dispatch({type: Navigation.NavigationActions.BACK});
                return true;
            });
        }
    }

    public componentWillUnmount() {
        // remove back handler's listener when destroyed
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', () => null);
        }
    }

    public render() {
        // use addNavigationHelpers to update our navigation property
        const {dispatch, navigation} = this.props;
        const navScreenProp = addNavigationHelpers({
            dispatch,
            state: navigation,
            addListener: boundListener
        });
        return <NativeAppRootNavigator navigation={navScreenProp} />;
    }
}

const mapStateToProps = (state: AppState) => ({navigation: state.navigation});
const RootNavigationStack = connect(mapStateToProps)(NativeApp);

const ConnectedNativeApp = () => (
    <Provider store={store}>
        <RootNavigationStack />
    </Provider>
);

export default ConnectedNativeApp;

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept();
}
