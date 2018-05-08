import {Platform} from 'react-native';
import {StackNavigator, SwitchNavigator} from 'react-navigation';
import App from 'src/app';
import SignInForm from 'src/view/components/auth/signin-form';
import Home from 'src/view/components/pages/home';

// This is the primary navigator stack for the application
const AppNavigator = StackNavigator(
    {
        Landing: {
            screen: Home
        },
        Main: {
            screen: App
        }
    },
    {
        headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
        initialRouteName: 'Landing'
    }
);

const LoginNavigator = StackNavigator(
    {
        Login: {
            screen: SignInForm
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Login'
    }
);

// Wrapping navigator, which has a separate tree for the authentication scenario
export const NativeAppRootNavigator = SwitchNavigator(
    {
        App: {screen: AppNavigator},
        Auth: {screen: LoginNavigator}
    },
    {
        initialRouteName: 'Auth'
    }
);
