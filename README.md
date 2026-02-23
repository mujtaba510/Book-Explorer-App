# Book Explorer App

A React Native application built with Expo that allows users to explore and discover books using the Open Library API. Users can search for books, view details, and browse popular titles.

## Features

- **Home Screen**: Browse popular mystery and thriller books
- **Search Screen**: Search for books by title, author, or keyword
- **Book Details**: View detailed information about a book including description and cover image
- **Star Rating**: Display book ratings
- **Responsive Design**: Optimized for mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A mobile device or emulator for testing

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/book-explorer-app.git
   cd book-explorer-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run tests to verify setup:
   ```bash
   npm test
   ```

## Running the App

1. Start the Expo development server:

   ```bash
   npm start / npx expo start
   ```

2. Choose your platform:
   - For Android: Press `a` or run `npm run android`
   - For iOS: Press `i` or run `npm run ios` (macOS only)
   - For Web: Press `w` or run `npm run web`

3. Scan the QR code with the Expo Go app on your mobile device, or use an emulator.

## Download APK

Download the latest APK build directly: [Book Explorer APK](https://expo.dev/accounts/ghulam_mujtaba/projects/book-explorer/builds/c58a3654-ee56-4434-bc70-7e0d8c4212de)

## Usage

- **Home Screen**: Upon opening the app, you'll see a list of popular mystery and thriller books. Tap on any book to view its details.
- **Search**: Use the search bar to find books by entering keywords. Results will appear as you type.
- **Book Details**: View the book's cover, title, author, description, and rating.

## API

This app uses the [Open Library API](https://openlibrary.org/developers/api) to fetch book data. No API key is required.

## Project Structure

```
book-explorer-app/
├── assets/                          # App icons and images
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── __tests__/               # Unit tests for components
│   │   │   ├── BookItem.test.tsx
│   │   │   ├── SearchBar.test.tsx
│   │   │   └── StarRating.test.tsx
│   │   ├── BookDetailImage.tsx
│   │   ├── BookDetailText.tsx
│   │   ├── BookItem.tsx
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SearchBookItem.tsx
│   │   └── StarRating.tsx
│   ├── screens/                     # App screens
│   │   ├── BookDetailScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── SearchScreen.tsx
│   ├── services/                    # API services
│   │   └── booksApi.ts
│   └── types.ts                     # TypeScript type definitions
├── App.tsx                          # Main app component
├── app.json                         # Expo configuration
├── index.ts                         # Entry point
├── jest.config.js                   # Jest configuration for testing
├── package.json                     # Dependencies and scripts
└── tsconfig.json                    # TypeScript configuration
```

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- Jest (for testing)
- Open Library API
