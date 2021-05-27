import React, { ReactElement } from 'react';

interface IStartIconProps {
  className?: string;
  title: string;
}

const StartIcon = (props: IStartIconProps): ReactElement => {
  const { className, title } = props;

  return (
    <svg
      className={className}
      fill="none"
      height="58"
      viewBox="0 0 34 58"
      width="34"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M1 16C1 15.4477 1.44772 15 2 15H32C32.5523 15 33 15.4477 33 16V37C33 40.866 29.866 44 26 44H8C4.13401 44 1 40.866 1 37V16Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 3C7 1.89543 7.89543 1 9 1H10C11.1046 1 12 1.89543 12 3V15H7V3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M22 3C22 1.89543 22.8954 1 24 1H25C26.1046 1 27 1.89543 27 3V15H22V3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5.02124 56.3499C7.73517 56.3499 13.1835 56.6666 15.4086 53.9259C17.6338 51.1852 18.1999 45.985 17.6012 44.0577"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M18.8224 39.0071L14.5581 29.6487L20.4274 29.7357L16.1777 19.3992"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export default StartIcon;
