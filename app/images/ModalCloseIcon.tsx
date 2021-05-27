import React, { ReactElement } from 'react';

interface IModalCloseIconProps {
  className?: string;
  title: string;
}

const ModalCloseIcon = (props: IModalCloseIconProps): ReactElement => {
  const { title } = props;

  return (
    <svg
      className="bi bi-x"
      color="currentColor"
      height="2em"
      viewBox="0 0 16 16"
      width="2em"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        clipRule="evenodd"
        d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ModalCloseIcon;
