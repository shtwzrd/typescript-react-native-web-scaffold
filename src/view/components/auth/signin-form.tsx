import React from 'react';
import {Button, Text, View} from 'react-native';
import * as Navigation from 'react-navigation';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppState} from 'src/state/store';

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
    dispatch
});

const SignInForm = (props: ReturnType<typeof mapDispatchToProps>) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 24}}>Welcome</Text>
            <Text style={{textAlign: 'center', fontSize: 64}}>🙂</Text>
            <Button
                title="Login"
                onPress={() => props.dispatch({type: Navigation.NavigationActions.NAVIGATE, routeName: 'App'})}
            />
        </View>
    );
};

export default connect(null, mapDispatchToProps)(SignInForm);
