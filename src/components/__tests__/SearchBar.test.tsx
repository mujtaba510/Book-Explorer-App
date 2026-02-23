import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import SearchBar from "../SearchBar";


jest.mock("@expo/vector-icons", () => ({
  Feather: "Feather",
}));

test("renders search input with placeholder", () => {
  render(<SearchBar value="" onChangeText={() => {}} />);
  expect(screen.getByPlaceholderText("Book title or author")).toBeTruthy();
});

test("calls onChangeText when typing", () => {
  const mockOnChange = jest.fn();
  render(<SearchBar value="" onChangeText={mockOnChange} />);
  const input = screen.getByPlaceholderText("Book title or author");
  fireEvent.changeText(input, "Test Book");
  expect(mockOnChange).toHaveBeenCalledWith("Test Book");
});

test("displays custom placeholder", () => {
  render(
    <SearchBar
      value=""
      onChangeText={() => {}}
      placeholder="Custom placeholder"
    />,
  );
  expect(screen.getByPlaceholderText("Custom placeholder")).toBeTruthy();
});
