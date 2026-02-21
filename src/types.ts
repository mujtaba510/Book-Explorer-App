export interface Book {
  id?: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    description?: string;
  };
}

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  BookDetail: { book: Book };
};