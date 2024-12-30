import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useGlobalSearchParams } from 'expo-router';
import WebView from 'react-native-webview';

export default function TabOneScreen() {
    const { url } = useGlobalSearchParams()
    const finalUrl = Array.isArray(url) ? url[0] : url
    console.log(finalUrl)
    return (
        <View style={styles.container}>
            <WebView source={{ uri: finalUrl }} style={styles.webview} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        color: "white",
        width: '100%',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    webview: {
        flex: 1,

        color: "white",
        borderColor: "blue",
        borderWidth: 2
    },
});
