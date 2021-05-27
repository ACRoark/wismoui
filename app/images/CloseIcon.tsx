import React, { ReactElement } from 'react';

interface ICloseIconProps {
  title: string;
}

const CloseIcon = (props: ICloseIconProps): ReactElement => {
  const { title } = props;

  return (
    <svg fill="currentColor" height="20" role="img" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M1 1L10.0178 10.0166M10.0178 10.0166L18.9668 18.9644M10.0178 10.0166L19 1.03558M10.0178 10.0166L1.03318 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CloseIcon;
