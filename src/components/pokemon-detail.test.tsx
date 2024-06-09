// PokemonDetail.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useGetPokemonByIdQuery } from "../services/pokemon";
import PokemonDetail from "./pokemon-detail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../services/pokemon");

const mockUseParams = useParams as jest.Mock;
const mockUseGetPokemonByIdQuery = useGetPokemonByIdQuery as jest.Mock;

test("renders loading state", () => {
  mockUseParams.mockReturnValue({ id: "1" });
  mockUseGetPokemonByIdQuery.mockReturnValue({ isLoading: true });

  render(<PokemonDetail />);

  expect(screen.getByRole("loader")).toBeInTheDocument();
});

test("renders error state", () => {
  mockUseParams.mockReturnValue({ id: "1" });
  mockUseGetPokemonByIdQuery.mockReturnValue({ error: new Error() });

  render(<PokemonDetail />);

  expect(screen.getByText(/issue in loading the data/i)).toBeInTheDocument();
});

test("renders pokemon detail", () => {
  mockUseParams.mockReturnValue({ id: "1" });
  mockUseGetPokemonByIdQuery.mockReturnValue({
    data: { name: "bulbasaur", types: [{ type: { name: "grass" } }] },
  });

  render(<PokemonDetail />);

  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText(/grass/i)).toBeInTheDocument();
});
