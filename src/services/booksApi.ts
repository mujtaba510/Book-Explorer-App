import { Book } from '../types';

export const fetchBooks = async (query?: string): Promise<Book[]> => {
  const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
  const searchQuery = query ? encodeURIComponent(query) : 'mystery+thriller';
  const url = `${baseUrl}?q=${searchQuery}&maxResults=20`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error; // Re-throw to let caller handle
  }
};