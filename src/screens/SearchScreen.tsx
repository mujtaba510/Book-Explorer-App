import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Book, RootStackParamList } from "../types";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchBookItem from "../components/SearchBookItem";
import { fetchBooks } from "../services/booksApi";

function SearchScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      const loadBooks = async () => {
        setLoading(true);
        try {
          const books = await fetchBooks(debouncedQuery);
          setBooks(books);
        } catch (err) {
          Alert.alert("Error", "Failed to search books. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      loadBooks();
    } else {
      setBooks([]);
    }
  }, [debouncedQuery]);

  const renderBook = ({ item }: { item: Book }) => (
    <SearchBookItem
      item={item}
      onPress={() => navigation.navigate("BookDetail", { book: item })}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Search" onBackPress={() => navigation.goBack()} />
      <View style={styles.searchContainer}>
        <Text style={styles.searchHeading}>Search Book</Text>
        <SearchBar value={query} onChangeText={setQuery} />
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#4f46e5"
            style={{ flex: 1, justifyContent: "center" }}
          />
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item, idx) => item.key ?? String(idx)}
            renderItem={renderBook}
            contentContainerStyle={styles.searchListContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f6fb",
  },
  searchContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: "#f3f6fb",
  },
  searchHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 20,
  },
  searchListContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
});

export default SearchScreen;
