import React from "react";
import { useState } from "react";

const SingleWatchedMovie = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <SingleMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

function SingleMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

export default SingleWatchedMovie;
