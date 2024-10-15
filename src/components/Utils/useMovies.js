import { useEffect, useState } from "react";

export function useMovies(query, key, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      const fetchMovies = async () => {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}
            `,
            { signal: controller.signal }
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

          setMovies(data.Search);
        } catch (err) {
          console.log(err);

          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      if (query.length < 4) {
        setMovies([]);
        setError("");
        return;
      }

      callBack?.();
      fetchMovies();
      return () => controller.abort();
    },
    [query]
  );

  return { movies, isLoading, error };
}
