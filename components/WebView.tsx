import React, { useState } from 'react';
import { WebView } from 'react-native-webview'
import Constants from 'expo-constants'
import { StyleSheet, TextInput, View } from 'react-native';

export default function App() {
    const [url, setUrl] = useState(``)

    return (


        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter a valid URL"
                onSubmitEditing={(event) => setUrl(event.nativeEvent.text)}
                returnKeyType="go"
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <WebView source={{ uri: url }} style={styles.webview} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        color: 'white',
        width: '100%',
    },
    input: {
        color: '#ccc',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    webview: {
        flex: 1,
        width: `100%`,
    },
});