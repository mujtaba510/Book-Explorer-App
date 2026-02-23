import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Book, RootStackParamList } from "../types";
import Header from "../components/Header";
import BookDetailImage from "../components/BookDetailImage";
import BookDetailText from "../components/BookDetailText";
import StarRating from "../components/StarRating";
import {
  fetchBookDetails,
  getCoverUrl,
  fetchBookRatings,
} from "../services/booksApi";

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
  const [ratings, setRatings] = useState<{
    averageRating: number | null;
    ratingsCount: number;
    reviews: any[];
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        if (book.key) {
          const d = await fetchBookDetails(book.key);
          if (mounted) setDetails(d);
        }
        if (book.isbn && book.isbn.length > 0) {
          const r = await fetchBookRatings(book.isbn[0]);
          if (mounted) setRatings(r);
        }
      } catch (e) {
        console.warn("Failed to load details or ratings", e);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [book.key, book.isbn]);

  const thumbnail = getCoverUrl(book.cover_i, "L");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <Header title="Book Explorer" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.detailContainer}>
        <BookDetailImage thumbnail={thumbnail} />
        <Text style={styles.detailTitle}>{book.title}</Text>
        <Text style={styles.detailAuthor}>
          {book.author_name?.join(", ") || "Unknown"}
        </Text>
        <Text style={styles.detailYear}>
          Published in {book.first_publish_year || "Unknown"}
        </Text>
        {ratings && ratings.averageRating && (
          <View style={styles.ratingContainer}>
            <StarRating
              rating={ratings.averageRating}
              size={20}
              showRating={true}
              reviewCount={ratings.ratingsCount}
            />
          </View>
        )}
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
        {ratings && ratings.reviews.length > 0 && (
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsHeading}>User Reviews</Text>
            {ratings.reviews.slice(0, 3).map((review, index) => (
              <View key={index} style={styles.review}>
                <Text style={styles.reviewAuthor}>
                  {review.author || "Anonymous"}
                </Text>
                <Text style={styles.reviewText}>
                  {review.content || review.textSnippet}
                </Text>
              </View>
            ))}
          </View>
        )}
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
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 5,
  },
  detailYear: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  reviewsContainer: {
    width: "100%",
    marginTop: 20,
  },
  reviewsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2FB78E",
    marginBottom: 10,
  },
  review: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2FB78E",
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});

export default BookDetailScreen;
