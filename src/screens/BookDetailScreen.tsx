import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Book, RootStackParamList } from "../types";
import Header from "../components/Header";
import BookDetailImage from "../components/BookDetailImage";
import BookDetailText from "../components/BookDetailText";
import { fetchBookDetails, getCoverUrl } from "../services/booksApi";

function BookDetailScreen({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: any;
}) {
  const { book } = route.params;
  const [details, setDetails] = useState<{
    description?: string | null;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        if (book.key) {
          const d = await fetchBookDetails(book.key);
          if (mounted) setDetails(d);
        }
      } catch (e) {
        console.warn("Failed to load work details", e);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [book.key]);

  const thumbnail = getCoverUrl(book.cover_i, "L");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <Header title="Book Explorer" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.detailContainer}>
        <BookDetailImage thumbnail={thumbnail} />
        <Text style={styles.detailTitle}>{book.title}</Text>
        <Text style={styles.detailAuthor}>
          by {book.author_name?.join(", ") || "Unknown"}
        </Text>
        <BookDetailText
          heading="About the author"
          text={
            book.author_name
              ? `${book.author_name[0]} is a renowned author known for their contributions to literature.`
              : "Author information not available."
          }
        />
        <BookDetailText
          heading="Overview"
          text={details?.description || "No description available."}
          isOverview
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f6fb",
  },
  detailContainer: {
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 10,
  },
  detailAuthor: {
    fontSize: 18,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default BookDetailScreen;
