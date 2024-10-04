import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StarRating } from "./components/Utils/StarRating.jsx";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating maxRating={10} color="blue" onSetRating={setMovieRating} />
//       <p>This movie has {movieRating} rating</p>
//     </div>
//   );
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      size={32}
      messages={["Awful", "Bad", "Fair", "Good", "Excellent"]}
      defaultRating={3}
    />
    <Test />
    <StarRating
      size={15}
      color="#Fc1255"
      messages={["Awful", "Bad", "Fair", "Good", "Excellent"]}
    /> */}
  </StrictMode>
);
