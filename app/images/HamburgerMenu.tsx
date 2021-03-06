import React, { ReactElement } from 'react';

interface IHamburgerMenuProps {
  title: string;
}

const HamburgerMenu = (props: IHamburgerMenuProps): ReactElement => {
  const { title } = props;

  return (
    <svg fill="none"
         height="20"
         viewBox="0 0 32 20"
         width="32"
         xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        clipRule="evenodd"
        d="M0 1C0 0.447715 0.447715 0 1 0H31C31.5523 0 32 0.447715 32 1C32 1.55228 31.5523 2 31 2H1C0.447715 2 0 1.55228 0 1ZM0 10C0 9.44771 0.447715 9 1 9H31C31.5523 9 32 9.44771 32 10C32 10.5523 31.5523 11 31 11H1C0.447715 11 0 10.5523 0 10ZM0 19C0 18.4477 0.447715 18 1 18H31C31.5523 18 32 18.4477 32 19C32 19.5523 31.5523 20 31 20H1C0.447715 20 0 19.5523 0 19Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default HamburgerMenu;
