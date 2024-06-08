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
    getPokemonList: builder.query<PokemonsResponse, number>({
      query: (page = 0) => `pokemon?offset=${page}&limit=20`,
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getPokemonById: builder.query<PokeAPI.Pokemon, string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByIdQuery } = pokemonApi;
