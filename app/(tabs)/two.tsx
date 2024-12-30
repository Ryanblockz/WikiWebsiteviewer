import React, { useState } from 'react';
import {
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import App from '@/components/WebView';

type SearchResult = {
  pageid: number;
  title: string;
  snippet: string; // Optional, included if you want to display it
};

export default function TabTwoScreen() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigation = useNavigation<any>(); // Adjust type if using a strongly typed navigation

  const searchWikipedia = async (keyword: string) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${keyword}&origin=*`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.query.search || []);
    } catch (error) {
      console.error('Error fetching Wikipedia data:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      color: 'white'
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 10,
      borderRadius: 5,
      color: 'white'
    },
    resultItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      color: 'white'
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
      backgroundColor: '#ccc',
    },
  });

  return (
    <View style={styles.container}>
      <App />
    </View>
  );
}
