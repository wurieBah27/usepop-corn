import React from "react";

const SingleWatchedMovie = ({ watched, handleDelete }) => {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <SingleMovie
          movie={movie}
          key={movie.imdbID}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

function SingleMovie({ movie, handleDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating?.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)} Stars</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime ? movie.runtime : ""} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDelete(movie.imdbID)}
        >
          x
        </button>
      </div>
    </li>
  );
}

export default SingleWatchedMovie;
