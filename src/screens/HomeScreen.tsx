import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Book, RootStackParamList } from "../types";
import Header from "../components/Header";
import BookItem from "../components/BookItem";
import { fetchBooks, fetchBookRatings } from "../services/booksApi";

function HomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [ratings, setRatings] = useState<{
    [key: string]: { averageRating: number | null; ratingsCount: number };
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
        // Fetch ratings for each book
        const ratingsPromises = fetchedBooks.map(async (book) => {
          if (book.isbn && book.isbn.length > 0) {
            try {
              const ratingData = await fetchBookRatings(book.isbn[0]);
              return {
                key: book.key,
                ratings: {
                  averageRating: ratingData.averageRating,
                  ratingsCount: ratingData.ratingsCount,
                },
              };
            } catch (e) {
              console.warn("Failed to fetch ratings for", book.title, e);
              return {
                key: book.key,
                ratings: { averageRating: null, ratingsCount: 0 },
              };
            }
          }
          return {
            key: book.key,
            ratings: { averageRating: null, ratingsCount: 0 },
          };
        });
        const ratingsResults = await Promise.all(ratingsPromises);
        const ratingsMap = ratingsResults.reduce((acc, { key, ratings }) => {
          acc[key!] = ratings;
          return acc;
        }, {} as any);
        setRatings(ratingsMap);
      } catch (err) {
        Alert.alert("Error", "Failed to load books. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const renderBook = ({ item }: { item: Book }) => (
    <BookItem
      item={item}
      onPress={() => navigation.navigate("BookDetail", { book: item })}
      ratings={ratings[item.key!]}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Book Explorer"
        onSearchPress={() => navigation.navigate("Search")}
      />
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
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f6fb",
  },
  listContainer: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
});

export default HomeScreen;
