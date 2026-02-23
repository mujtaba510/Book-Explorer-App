import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showRating?: boolean;
  reviewCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 16,
  showRating = false,
  reviewCount,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Text key={`full-${i}`} style={[styles.star, { fontSize: size }]}>
            ★
          </Text>
        ))}
        {hasHalfStar && (
          <Text style={[styles.star, { fontSize: size }]}>☆</Text>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Text
            key={`empty-${i}`}
            style={[styles.emptyStar, { fontSize: size }]}
          >
            ☆
          </Text>
        ))}
      </View>
      {showRating && (
        <Text style={styles.ratingText}>
          {rating.toFixed(1)} {reviewCount ? `(${reviewCount} reviews)` : ""}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
  },
  star: {
    color: "#FFD700",
    marginRight: 2,
  },
  emptyStar: {
    color: "#D1D5DB",
    marginRight: 2,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#6B7280",
  },
});

export default StarRating;
