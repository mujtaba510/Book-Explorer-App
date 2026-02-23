export interface Book {
  key?: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
}

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  BookDetail: { book: Book };
};
