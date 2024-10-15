import React, { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export const SearchBar = ({ query, setQuery }) => {
  const inputElRef = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputElRef) return;
    inputElRef.current.focus();
    setQuery("");
  });

  // useEffect(() => {
  //   function callBack(e) {

  //     if (e.code === "Enter") {

  //     }
  //     if (e.code === "Backspace") {

  //     }
  //   }

  //   document.addEventListener("keydown", callBack);

  //   return () => document.addEventListener("keydown", callBack);
  // }, [setQuery]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElRef}
    />
  );
};
