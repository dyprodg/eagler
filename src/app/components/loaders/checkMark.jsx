import React from "react";

const CheckMark = ({message}) => {
  return (
    <div className="mt-8 m-8 flex flex-col items-center justify-center">
      {/* SVG element for rendering a checkmark */}
      <svg
        className="checksvg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        {/* Circle path for the outer circle */}
        <circle
          className="path circle"
          fill="none"
          stroke="#73AF55"
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        {/* Polyline path for the checkmark */}
        <polyline
          className="path check"
          fill="none"
          stroke="#73AF55"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
      <p className="mt-4 text-center">{message}</p>
      
    </div>
  );
};

// Export the CheckMark component
export default CheckMark;
