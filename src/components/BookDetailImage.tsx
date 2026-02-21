import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface BookDetailImageProps {
  thumbnail?: string;
}

const BookDetailImage: React.FC<BookDetailImageProps> = ({ thumbnail }) => {
  if (thumbnail) {
    return <Image source={{ uri: thumbnail }} style={styles.image} />;
  }

  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>No Image</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholder: {
    width: 200,
    height: 300,
    borderRadius: 10,
    backgroundColor: '#e6e9ef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#9aa0b4',
    fontSize: 12,
  },
});

export default BookDetailImage;