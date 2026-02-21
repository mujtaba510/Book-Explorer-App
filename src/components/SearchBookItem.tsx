import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Book } from '../types';

interface SearchBookItemProps {
  item: Book;
  onPress: () => void;
}

const SearchBookItem: React.FC<SearchBookItemProps> = ({ item, onPress }) => {
  const info = item.volumeInfo;

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{info.title}</Text>
      <Text style={styles.author}>by {info.authors?.join(', ') || 'Unknown'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2FB78E',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#9D9D9D',
  },
});

export default SearchBookItem;