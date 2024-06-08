// App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders without crashing", () => {
  render(<App />, { wrapper: MemoryRouter });
  expect(screen.getByText(/pokemon/i)).toBeInTheDocument();
});

test("renders PokemonList on /", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/pokemon list/i)).toBeInTheDocument();
});

test("renders PokemonDetail on /pokemon/:id", () => {
  render(
    <MemoryRouter initialEntries={["/pokemon/1"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/pokemon detail/i)).toBeInTheDocument();
});
