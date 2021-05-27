import React, { ReactElement } from 'react';

interface IChevronRightProps {
  className?: string;
  title: string;
}

const ChevronRight = (props: IChevronRightProps): ReactElement => {
  const { title } = props;

  return (
    <svg
      className="bi bi-chevron-right"
      height="1em"
      viewBox="0 0 16 16"
      width="1em"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        clipRule="evenodd"
        d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
        fillRule="evenodd"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
};

export default ChevronRight;
