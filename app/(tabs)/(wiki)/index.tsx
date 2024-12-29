import React, { useState } from 'react';
import {
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRouter } from 'expo-router'

// Define the navigation parameter types
type RootStackParamList = {
    detail: { title: string; url: string };
};

// Define the structure of a Wikipedia search result
type SearchResult = {
    pageid: number;
    title: string;
    snippet?: string; // Optional field if you want to include snippets
};

export default function TabTwoScreen(): JSX.Element {
    const [query, setQuery] = useState<string>(''); // State for search input
    const [results, setResults] = useState<SearchResult[]>([]); // State for search results

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const searchWikipedia = async (keyword: string): Promise<void> => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${keyword}&origin=*`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResults(data.query.search || []); // Update results or fallback to an empty array
        } catch (error) {
            console.error('Error fetching Wikipedia data:', error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            color: "white"
        },
        input: {
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            paddingHorizontal: 10,
            marginBottom: 10,
            borderRadius: 5,
            color: "white"
        },
        resultItem: {
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            color: "white"
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: '80%',
            backgroundColor: '#ccc',
        },
    });
    const router = useRouter()

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search Wikipedia"
                value={query}
                onChangeText={(text) => setQuery(text)}
                onSubmitEditing={() => searchWikipedia(query)}
            />
            <FlatList
                data={results}
                keyExtractor={(item) => item.pageid.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            const link = `https://en.wikipedia.org/wiki/${item.title.replace(/ /g, '_')}`
                            return router.push(`/(tabs)/(wiki)/detail?url=${link}`)
                        }
                            // navigation.navigate('detail', {
                            //     title: item.title,
                            //     url: `https://en.wikipedia.org/wiki/${item.title.replace(/ /g, '_')}`,
                            // })
                        }
                    >
                        <Text style={styles.resultItem}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.separator} />
        </View>
    );
}
