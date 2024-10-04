import React from "react";

const Button = ({ open, close }) => {
  return (
    <button className="btn-toggle" onClick={() => close((open) => !open)}>
      {open ? "–" : "+"}
    </button>
  );
};

export default Button;
