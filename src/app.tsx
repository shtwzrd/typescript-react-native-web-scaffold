import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PlatformInfo} from 'src/view/components/platform-info';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#00d8ff',
        fontSize: 96
    }
});

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>[☕]</Text>
            <PlatformInfo />
        </View>
    );
};

export default App;
