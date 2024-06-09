import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { server } from "../mocks/server";
import { store } from "../store";
import PokemonDetail from "./pokemon-detail";

describe("PokemonDetail Component", () => {
  test("renders loading spinner when fetching data", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/1"]}>
          <Routes>
            <Route path="pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("loader")).toBeInTheDocument();
  });

  test("displays error message when there is an error", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BASE_API_URL}/pokemon/:id`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/ab"]}>
          <Routes>
            <Route path="pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </MemoryRouter>
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

  test("displays not found message when pokemon does not exist", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BASE_API_URL}/pokemon/:id`,
        (req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ message: "Not Found" }));
        }
      )
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/999"]}>
          <Routes>
            <Route path="pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    // added a delay to wait for the error message to be displayed
    setTimeout(async () => {
      expect(
        await screen.findByText(/Pokémon could not be found/i)
      ).toBeInTheDocument();
    }, 1000);
  });

  test("renders Pokemon details when data is fetched successfully", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/1"]}>
          <Routes>
            <Route path="pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const bulbasaurTextCount = await (
      await screen.findAllByText(/bulbasaur/i)
    ).length;

    const height = (await screen.findByText(/Height/i)).parentElement
      ?.textContent;

    const weight = (await screen.findByText(/Weight/i)).parentElement
      ?.textContent;

    expect(bulbasaurTextCount).toBe(2);
    expect(height).toBe("Height: 0.7 m");
    expect(weight).toBe("Weight: 6.9 kg");
    expect(await screen.findByText(/grass/i)).toBeInTheDocument();
    expect(await screen.findByText(/poison/i)).toBeInTheDocument();
  });
});
