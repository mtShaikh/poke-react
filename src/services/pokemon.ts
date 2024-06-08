import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokeAPI } from "pokeapi-types";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonsResponse {
  results: Pokemon[];
  next: string | null;
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<{ results: Pokemon[] }, void>({
      query: () => "pokemon",
      transformResponse: (response: PokemonsResponse) => ({
        results: response.results,
      }),
    }),
    getPokemonById: builder.query<PokeAPI.Pokemon, string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByIdQuery } = pokemonApi;
