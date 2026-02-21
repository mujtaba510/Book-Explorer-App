import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Book, RootStackParamList } from '../types';
import Header from '../components/Header';
import BookDetailImage from '../components/BookDetailImage';
import BookDetailText from '../components/BookDetailText';

function BookDetailScreen({ navigation, route }: { navigation: NativeStackNavigationProp<RootStackParamList>; route: any }) {
  const { book } = route.params;
  const info = book.volumeInfo;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <Header title="Book Explorer" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.detailContainer}>
        <BookDetailImage thumbnail={info.imageLinks?.thumbnail} />
        <Text style={styles.detailTitle}>{info.title}</Text>
        <Text style={styles.detailAuthor}>by {info.authors?.join(', ') || 'Unknown'}</Text>
        <BookDetailText
          heading="About the author"
          text={info.authors ? `${info.authors[0]} is a renowned author known for their contributions to literature.` : 'Author information not available.'}
        />
        <BookDetailText
          heading="Overview"
          text={info.description || 'No description available.'}
          isOverview
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f3f6fb',
  },
  detailContainer: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailAuthor: {
    fontSize: 18,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default BookDetailScreen;