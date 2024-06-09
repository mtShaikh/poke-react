import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokeAPI } from "pokeapi-types";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonsResponse {
  results: Pokemon[];
  next: string | null;
  page: number;
}

const apiController = new AbortController();

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonsResponse, number>({
      query: (page = 0) => ({
        url: `pokemon?offset=${page}&limit=20`,
        signal: apiController.signal,
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // merge incoming data to the cache entry
      merge: (currentCache, responseData) => {
        // only update cache when loading more data
        if (responseData.page > currentCache.page) {
          currentCache.page = responseData.page;
          currentCache.results.push(...responseData.results);
          return currentCache;
        }
        return responseData;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      /* add page arg to the cache */
      transformResponse(items: PokemonsResponse, meta, arg) {
        return { ...items, page: arg };
      },
    }),
    getPokemonById: builder.query<PokeAPI.Pokemon, string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByIdQuery } = pokemonApi;
