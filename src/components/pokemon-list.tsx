import React, { useState } from "react";
import { useGetPokemonListQuery } from "../services/pokemon";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
import Header from "./header";
import { ShouldRender } from "./should-render";

const PokemonList: React.FC = () => {
  const [page, setPage] = useState(0);
  const { data, error, isLoading, isFetching } = useGetPokemonListQuery(page);

  const handleLoadMore = () => {
    if (data?.next) {
      setPage((prevPage) => prevPage + 20);
    }
  };

  return (
    <>
      <ShouldRender if={isLoading}>
        <div className="h-screen flex justify-center items-center text-center">
          <Spinner />
        </div>
      </ShouldRender>
      <ShouldRender if={!isLoading}>
        <div className="flex flex-col gap-6">
          <Header />
          <ShouldRender if={error}>
            <p className="text-red-500 text-center font-medium text-lg">
              There seems to be an issue in loading the data. Please check back
              in later
            </p>
          </ShouldRender>
          <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <ShouldRender if={data?.results.length === 0}>
              <div className="text-center font-medium text-lg">
                No Pokémons found
              </div>
            </ShouldRender>
            {data?.results?.map((pokemon) => (
              <Link
                to={`/pokemon/${pokemon.name}`}
                key={pokemon.name}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                  alt={pokemon.name}
                  className="w-32 h-32"
                />
                <div className="mt-2 text-center font-semibold capitalize">
                  {pokemon.name}
                </div>
              </Link>
            ))}
            <button
              onClick={handleLoadMore}
              className="mb-10 col-span-full justify-self-center w-[10%] bg-blue-500 hover:bg-blue-700 text-white flex justify-center font-bold py-2 px-4
               rounded focus:outline-none focus:shadow-outline"
              disabled={!data?.next || isFetching}
            >
              {isFetching ? (
                <Spinner className="w-6 h-6 border-white" />
              ) : (
                "Load More"
              )}
            </button>
          </div>
        </div>
      </ShouldRender>
    </>
  );
};

export default PokemonList;
