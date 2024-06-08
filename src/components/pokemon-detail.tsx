import React from "react";
import { useParams } from "react-router-dom";
import { useGetPokemonByIdQuery } from "../services/pokemon";
import { ShouldRender } from "./should-render";
import Spinner from "./spinner";
import Header from "./header";
import { typeColors } from "../constants";
import clsx from "clsx";

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: pokemon, error, isLoading } = useGetPokemonByIdQuery(id!);

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
          <ShouldRender if={!pokemon && !error}>
            <div className="text-center text-xl mt-12">
              Pokémon could not be found
            </div>
          </ShouldRender>
          <ShouldRender if={pokemon}>
            <div className="flex flex-col items-center">
              <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <div className="flex flex-col md:flex-row items-center">
                  <img
                    src={`https://img.pokemondb.net/artwork/large/${pokemon?.name}.jpg`}
                    alt={pokemon?.name}
                    className="w-48 h-48 md:w-72 md:h-72 rounded-full mx-auto md:mx-0 md:mr-8"
                  />
                  <div className="mt-4 md:mt-0">
                    <h2 className="text-2xl font-semibold text-center md:text-left">
                      {pokemon?.name.toUpperCase()}
                    </h2>
                    <div className="mt-2 text-lg">
                      <p>
                        <strong>Height:</strong> {(pokemon?.height ?? 0) / 10} m
                      </p>
                      <p>
                        <strong>Weight:</strong> {(pokemon?.weight ?? 0) / 10}{" "}
                        kg
                      </p>
                      <div className="flex flex-wrap items-center">
                        <p className="mr-2">
                          <strong>Type:</strong>
                        </p>
                        <div className="inline-flex gap-1 text-xs">
                          {pokemon?.types.map((type, index) => (
                            <span
                              key={index}
                              className={clsx(
                                "inline-block  rounded px-3 py-1 text-white",
                                typeColors[type.type.name] || "bg-gray-500"
                              )}
                            >
                              {type.type.name.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-2">
                        <strong>Species:</strong>{" "}
                        <span className="text-lg">{pokemon?.species.name}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ShouldRender>
        </div>
      </ShouldRender>
    </>
  );
};

export default PokemonDetail;
