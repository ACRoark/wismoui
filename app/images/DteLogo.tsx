import React, { ReactElement } from 'react';

interface IDteLogoProps {
  className?: string;
  title: string;
}

const DteLogo = (props: IDteLogoProps): ReactElement => {
  const { className, title } = props;

  return (
    <svg
      className={className}
      fill="none"
      height="32"
      viewBox="0 0 93 32"
      width="93"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M62.0682 7.78728H53.1416V32H41.5539V7.78728H32.6094V0.0179513H62.0682V7.78728ZM92.7523 7.66162V0H66.4833V24.3133C66.4833 28.5103 69.8696 31.9102 74.0418 31.9102H78.9605H92.888V24.2127H79.4035C78.4283 24.2127 77.6353 23.4157 77.6353 22.4355V19.2761H92.145V12.1853H77.6353V7.66162H92.7523ZM19.6178 31.9749H0V0.0502637H19.5535C24.7223 0.0502637 28.9087 4.26164 28.9087 9.45316V22.6366C28.9087 27.7922 24.7509 31.9749 19.6178 31.9749ZM18.1961 21.8826V10.0061C18.1961 8.65253 17.1031 7.5575 15.76 7.5575H11.4699V24.3312H15.76C17.1031 24.3312 18.1961 23.2362 18.1961 21.8826Z"
        fill="currentColor" />
    </svg>
  );
};

export default DteLogo;
