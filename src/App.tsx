import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonList from "./components/pokemon-list";
import PokemonDetail from "./components/pokemon-detail";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/" element={<PokemonList />} />
    </Routes>
  </Router>
);

export default App;
