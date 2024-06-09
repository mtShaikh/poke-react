import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import PokemonList from "./pokemon-list";
import "@testing-library/jest-dom";
import { server } from "../mocks/server";
import { rest } from "msw";
import { mockListData } from "../mocks/data";

const mockDataPage2 = {
  results: [{ name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" }],
  next: "https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20",
};

describe("PokemonList Component", () => {
  test("renders loading spinner when fetching data", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole("loader")).toBeInTheDocument();
  });

  test("displays error message when there is an error", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BASE_API_URL}/pokemon`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );

    // added a delay to wait for the error message to be displayed
    setTimeout(async () => {
      expect(
        await screen.findByText(
          /There seems to be an issue in loading the data/i
        )
      ).toBeInTheDocument();
    }, 1000);
  });

  test("renders Pokemon list when data is fetched successfully", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/ivysaur/i)).toBeInTheDocument();
  });

  test('handles "Load More" button functionality', async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BASE_API_URL}/pokemon`,
        (req, res, ctx) => {
          const offset = req.url.searchParams.get("offset");
          if (offset === "20") {
            return res(ctx.json(mockDataPage2));
          }
          return res(ctx.json(mockListData));
        }
      )
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );

    const loadMoreButton = await screen.findByText(/Load More/i);
    fireEvent.click(loadMoreButton);

    expect(await screen.findByText(/venusaur/i)).toBeInTheDocument();
  });
});
