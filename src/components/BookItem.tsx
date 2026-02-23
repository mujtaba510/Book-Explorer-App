import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Book } from "../types";
import { getCoverUrl } from "../services/booksApi";
import StarRating from "./StarRating";

interface BookItemProps {
  item: Book;
  onPress?: () => void;
  showAuthor?: boolean;
  ratings?: { averageRating: number | null; ratingsCount: number };
}

const BookItem: React.FC<BookItemProps> = ({
  item,
  onPress,
  showAuthor = true,
  ratings,
}) => {
  const year = item.first_publish_year
    ? item.first_publish_year.toString()
    : "Unknown";

  const content = (
    <View style={styles.content}>
      {getCoverUrl(item.cover_i) ? (
        <Image
          source={{
            uri: getCoverUrl(item.cover_i),
          }}
          style={styles.coverImage}
        />
      ) : (
        <View style={styles.coverPlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.bookMeta}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {showAuthor && (
          <>
            <Text style={styles.bookDetail}>
              Author: {item.author_name?.join(", ") || "Unknown"}
            </Text>
            <Text style={styles.bookDetail}>Year: {year}</Text>
            {ratings && ratings.averageRating && (
              <StarRating
                rating={ratings.averageRating}
                size={14}
                showRating={true}
                reviewCount={ratings.ratingsCount}
              />
            )}
          </>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.bookItemTouchable}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.bookItem}>{content}</View>;
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  coverImage: {
    width: 90,
    height: 135,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  coverPlaceholder: {
    width: 90,
    height: 135,
    borderRadius: 6,
    backgroundColor: "#e6e9ef",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9aa0b4",
    fontSize: 12,
  },
  bookMeta: {
    flex: 1,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  bookDetail: {
    fontSize: 13,
    color: "#475569",
    marginTop: 4,
  },
  bookItemTouchable: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  bookItem: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default BookItem;
