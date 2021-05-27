import React, { ReactElement } from 'react';

interface IExclamationPointProps {
  className?: string;
  title: string;
}

const ExclamationPoint = (props: IExclamationPointProps): ReactElement => {
  const { className, title } = props;

  return (
    <svg
      className={className}
      fill="none"
      height="23"
      viewBox="0 0 6 23"
      width="6"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M4.43457 15.4961H1.88574L1.12402 0.583984H5.18164L4.43457 15.4961ZM0.948242 20.1689C0.948242 19.4463 1.13867 18.8994 1.51953 18.5283C1.90039 18.1475 2.44238 17.957 3.14551 17.957C3.83887 17.957 4.37109 18.1523 4.74219 18.543C5.11328 18.9336 5.29883 19.4756 5.29883 20.1689C5.29883 20.8623 5.1084 21.4141 4.72754 21.8242C4.35645 22.2246 3.8291 22.4248 3.14551 22.4248C2.45215 22.4248 1.91016 22.2295 1.51953 21.8389C1.13867 21.4482 0.948242 20.8916 0.948242 20.1689Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ExclamationPoint;
