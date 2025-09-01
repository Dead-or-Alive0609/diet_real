import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, link }) => {
  const navigate = useNavigate();

  return (
    <button className="custom-btn" onClick={() => navigate(link)}>
      {text}
    </button>
  );
};

export default Button;
