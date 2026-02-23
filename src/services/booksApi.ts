import { Book } from "../types";

export const fetchBooks = async (query?: string): Promise<Book[]> => {
  const baseUrl = "https://openlibrary.org/search.json";
  const searchQuery = query ? encodeURIComponent(query) : "mystery+thriller";
  const url = `${baseUrl}?q=${searchQuery}&limit=20`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    
    const booksWithIsbn = data.docs.map((doc: any) => ({
      ...doc,
      isbn:
        doc.ia
          ?.filter((id: string) => id.startsWith("isbn_"))
          .map((id: string) => id.replace("isbn_", "")) || [],
    }));
    return booksWithIsbn;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getCoverUrl = (
  cover_i?: number,
  size: "S" | "M" | "L" = "M",
): string | undefined => {
  if (!cover_i) return undefined;
  return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`;
};

export const fetchBookDetails = async (workKey: string) => {
  const url = `https://openlibrary.org${workKey}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error fetching work: ${res.status}`);
  const data = await res.json();
  const description =
    typeof data.description === "string"
      ? data.description
      : data.description?.value;
  return {
    description: description ?? null,
    subjects: data.subjects ?? [],
  };
};

export const fetchBookRatings = async (isbn: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error fetching ratings: ${res.status}`);
  const data = await res.json();
  const volume = data.items?.[0];
  if (!volume) return { averageRating: null, ratingsCount: 0, reviews: [] };
  const { averageRating, ratingsCount } = volume.volumeInfo;
  const reviews = volume.volumeInfo.reviews || [];
  return {
    averageRating: averageRating || null,
    ratingsCount: ratingsCount || 0,
    reviews,
  };
};
