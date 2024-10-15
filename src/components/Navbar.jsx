import React from "react";
import { SearchBar } from "./Utils/SearchBar";
import Logo from "./Utils/Logo";

const Navbar = ({ movies, query, setQuery }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar query={query} setQuery={setQuery} />
      <NumMovies>{movies.length}</NumMovies>
    </nav>
  );
};

function NumMovies({ children }) {
  return (
    <p className="num-results">
      Found <strong>{children}</strong> results
    </p>
  );
}

export default Navbar;
