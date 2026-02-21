import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface BookDetailTextProps {
  heading: string;
  text: string;
  isOverview?: boolean;
}

const BookDetailText: React.FC<BookDetailTextProps> = ({ heading, text, isOverview = false }) => {
  return (
    <>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={[styles.text, isOverview && styles.overview]} numberOfLines={isOverview ? 2 : undefined} ellipsizeMode={isOverview ? "tail" : undefined}>
        {text}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'left',
  },
  overview: {
    marginBottom: 40,
  },
});

export default BookDetailText;