// PokemonList.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useGetPokemonListQuery } from "../services/pokemon";
import PokemonList from "./pokemon-list";

jest.mock("../services/pokemon");

const mockUseGetPokemonListQuery = useGetPokemonListQuery as jest.Mock;

test("renders loading state", () => {
  mockUseGetPokemonListQuery.mockReturnValue({ isLoading: true });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>
  );

  expect(screen.getByRole("loader")).toBeInTheDocument();
});

test("renders error state", () => {
  mockUseGetPokemonListQuery.mockReturnValue({ error: new Error() });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>
  );

  expect(screen.getByText(/issue in loading the data/i)).toBeInTheDocument();
});

test("renders empty state", () => {
  mockUseGetPokemonListQuery.mockReturnValue({ data: { results: [] } });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>
  );

  expect(screen.getByText(/No Pokémons found/i)).toBeInTheDocument();
});

test("renders list of pokemons and load more button", () => {
  mockUseGetPokemonListQuery.mockReturnValue({
    data: {
      results: [{ name: "bulbasaur" }, { name: "pikachu" }],
      next: "url",
    },
    isFetching: false,
  });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>
  );

  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  expect(screen.getByText(/Load More/i)).toBeInTheDocument();
});

test("clicking load more button fetches more pokemons", () => {
  const mockSetPage = jest.fn();
  React.useState = jest.fn(() => [0, mockSetPage]);

  mockUseGetPokemonListQuery.mockReturnValue({
    data: {
      results: [{ name: "bulbasaur" }, { name: "pikachu" }],
      next: "url",
    },
    isFetching: false,
  });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText(/Load More/i));

  expect(mockSetPage).toHaveBeenCalledWith(20);
});
