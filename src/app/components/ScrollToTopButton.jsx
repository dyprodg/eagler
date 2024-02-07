import React from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = ({ isVisible, scrollToTop }) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 1000,
      }}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
