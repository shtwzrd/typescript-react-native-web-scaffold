import {NavigationActions, NavigationStackAction, NavigationState} from 'react-navigation';
import {NativeAppRootNavigator} from 'src/state/ducks/native-navigation/routes';

export const initialNavigationState: NavigationState = NativeAppRootNavigator.router.getStateForAction(
    NavigationActions.init()
);

// pass-thru reducer
export default function reducer(
    state: NavigationState = initialNavigationState,
    action: NavigationStackAction
): NavigationState {
    const nextState = NativeAppRootNavigator.router.getStateForAction(action, state);

    return nextState || state;
}
