import React, { ReactElement } from 'react';

const CompletedIcon = (): ReactElement => (
  <svg
    className="completed icon"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"
      clipRule="evenodd"
      stroke="currentColor"
      strokeWidth="1px"
    />
  </svg>
);

export default CompletedIcon;
