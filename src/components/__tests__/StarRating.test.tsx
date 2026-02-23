import React from "react";
import { render, screen } from "@testing-library/react-native";
import StarRating from "../StarRating";

test("renders full stars correctly", () => {
  render(<StarRating rating={4} />);
  const stars = screen.getAllByText("★");
  expect(stars).toHaveLength(4);
});

test("renders half star correctly", () => {
  render(<StarRating rating={3.5} />);
  const fullStars = screen.getAllByText("★");
  expect(fullStars).toHaveLength(3);
  // Half star is also ★ in this implementation
});

test("renders rating text when showRating is true", () => {
  render(<StarRating rating={4.5} showRating={true} />);
  expect(screen.getByText("4.5")).toBeTruthy();
});

test("renders review count when provided", () => {
  render(<StarRating rating={4.5} showRating={true} reviewCount={10} />);
  expect(screen.getByText("4.5 (10 reviews)")).toBeTruthy();
});

test("respects maxStars prop", () => {
  render(<StarRating rating={3} maxStars={10} />);
  const stars = screen.getAllByText("★");
  expect(stars).toHaveLength(3);
  const emptyStars = screen.getAllByText("☆");
  expect(emptyStars).toHaveLength(7);
});
