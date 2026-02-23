import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import BookItem from "../BookItem";
import { Book } from "../../types";

const mockItem: Book = {
  title: "Test Book",
  author_name: ["Test Author"],
  cover_i: 12345,
  first_publish_year: 2020,
};

test("renders book title and author", () => {
  render(<BookItem item={mockItem} />);
  expect(screen.getByText("Test Book")).toBeTruthy();
  expect(screen.getByText("Author: Test Author")).toBeTruthy();
});

test("calls onPress when tapped", () => {
  const mockOnPress = jest.fn();
  render(<BookItem item={mockItem} onPress={mockOnPress} />);
  fireEvent.press(screen.getByText("Test Book"));
  expect(mockOnPress).toHaveBeenCalled();
});
