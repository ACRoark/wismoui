import React, { ReactElement } from 'react';

const BackArrow = (): ReactElement => (
  <svg
    className="back-arrow"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
      clipRule="evenodd"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

export default BackArrow;
