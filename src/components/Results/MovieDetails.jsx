import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { StarRating } from "../Utils/StarRating";
import Loader from "../Utils/Loader";
import { useKey } from "../Utils/useKey";

function MovieDetails({ id, onCloseMovie, KEY, onHandleWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(id);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === id
  )?.userRating;
  const {
    Title: title,
    Actors: actors,
    Country: country,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    Released: released,
    Director: director,
    Runtime: runtime,
    imdbRating,
    Year: year,
  } = movie;

  const handleAddNewMovieWatched = () => {
    const newWatchedMovie = {
      imdbID: id,
      imdbRating: Number(imdbRating),
      poster,
      year,
      userRating,
      title,
      runtime: Number(runtime.split(" ").at(0)),
      userRatingDecisions: countRef.current,
    };

    onHandleWatched(newWatchedMovie);
    onCloseMovie();
  };

  useKey("Escape", onCloseMovie);
  useKey("Backspace", onCloseMovie);

  useEffect(
    function () {
      const getMovieDetails = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${id}
        `
          );

          if (!res.ok)
            throw new Error(
              "Something went wrong, please try to reload or check your internet connections."
            );
          const data = await res.json();

          if (data.Response === "False")
            throw new Error(
              `We cannot find the movie ${query}. Please  try searching for another Movie`
            );
          setMovie(data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      };

      getMovieDetails();
    },
    [id]
  );

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => (document.title = `usePopcorn Movies`);
  }, [title]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>Country: {country}</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You Alredy Rated this movie {watchedUserRating}{" "}
                  <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={20}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={handleAddNewMovieWatched}
                    >
                      + Add Movie
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring: {actors}</p>
            <p>
              Directed by: {director} in {year}
            </p>
          </section>{" "}
        </>
      )}
    </div>
  );
}

export default MovieDetails;
