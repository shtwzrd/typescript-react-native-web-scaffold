import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';

export const PlatformInfo = () => {
    return (
        <View>
            <Text style={styles.text}>Platform: 
                <Text style={styles.highlightedText}> {Platform.OS}</Text>
            </Text>
            <Text style={styles.text}>Extension: native</Text>
            <Text style={styles.text}>Env: {process.env.NODE_ENV}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#00d8ff",
        fontSize: 22,
    },
    highlightedText: {
        // For small variations, you can discriminate by platform
        // For bigger differences, there's seperate .android.ts and .ios.ts
        ...Platform.select({
            ios: {
                color: '#ffffff',
            },
            android: {
                color: '#a4c639',
            },
        }),
        fontSize: 24
   }
});

