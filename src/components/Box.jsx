import React from "react";
import { useState } from "react";
import Button from "./Utils/Button";

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button close={setIsOpen} open={isOpen} />

      {isOpen && children}
    </div>
  );
};

export default Box;
