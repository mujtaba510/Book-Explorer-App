export interface Book {
  key?: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  // Add more fields if needed
}

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  BookDetail: { book: Book };
};
