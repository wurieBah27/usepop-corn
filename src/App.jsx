import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SingleMovie from "./components/Results/SingleMovie";
import Box from "./components/Box";
import WatchedMoviesSummary from "./components/Results/WatchedMoviesSummary";
import SingleWatchedMovie from "./components/Results/SingleWatchedMovie";
import MovieDetails from "./components/Results/MovieDetails";
import Loader from "./components/Utils/Loader";
import { useMovies } from "./components/Utils/useMovies";
import { useLocalStorageState } from "./components/Utils/useLocalStorage";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "be1eef34";

export default function App() {
  const [query, setQuery] = useState("");

  const [movieID, setMovieID] = useState(null);
  // const [watched, setWatched] = useState([]);

  const { movies, isLoading, error } = useMovies(query, KEY, closeMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  // const [watched, setWatched] = useState(function () {
  //   const data = JSON.parse(localStorage.getItem("watched"));

  //   return data;
  // });

  const handleSetMovieID = (id) =>
    setMovieID((movieID) => (movieID === id ? null : id));

  function closeMovie() {
    setMovieID(null);
  }

  const handleWatched = (movie) => setWatched((watched) => [...watched, movie]);

  const handleDelete = (id) =>
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <SingleMovie movies={movies} handleSetMovieID={handleSetMovieID} />
          )}
        </Box>
        <Box>
          {movieID ? (
            <MovieDetails
              id={movieID}
              onCloseMovie={closeMovie}
              KEY={KEY}
              onHandleWatched={handleWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} average={average} />
              <SingleWatchedMovie
                watched={watched}
                handleDelete={handleDelete}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🚫</span> {message}
    </p>
  );
}
