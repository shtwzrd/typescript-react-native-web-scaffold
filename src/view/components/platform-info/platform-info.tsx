import * as React from 'react';
import { Platform } from 'react-native';

export const PlatformInfo = () => {
    // Notice the DOM elements: we can use plain React here,
    // because React Native will take the .native.tsx file instead
    return (
        <div>
            <p style={styles.text}>Platform: {Platform.OS}</p>
            <p style={styles.text}>Extension: none (web)</p>
            <p style={styles.text}>Env: {process.env.NODE_ENV}</p>
        </div>
    )
}

const styles = {
    text: {
        color: "#00d8ff",
        fontSize: 22
    }
};
