import React, { ReactElement } from 'react';

interface ITransferIconProps {
  className?: string;
  title: string;
}

const TransferIcon = (props: ITransferIconProps): ReactElement => {
  const { title } = props;

  return (
    <svg
      fill="none"
      height="33"
      viewBox="0 0 54 33"
      width="54"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g clipPath="url(#clip0)">
        <path
          d="M14.3774 26.9065H8.14258V13.6438"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M8.14258 4.03913V0.761566H31.2481C33.742 0.761566 35.7958 2.13357 35.7958 3.88669V26.9821H25.0132"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M38.949 26.9064H35.7949V14.8632H50.4651C51.9321 14.8632 53.0323 16.0828 53.0323 17.531V26.9064H49.5849"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M0 6.6312H16.2839"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M3.22656 10.976H19.5105"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M20.025 32.0894C22.7797 32.0894 25.0128 29.7689 25.0128 26.9063C25.0128 24.0437 22.7797 21.7231 20.025 21.7231C17.2703 21.7231 15.0371 24.0437 15.0371 26.9063C15.0371 29.7689 17.2703 32.0894 20.025 32.0894Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M43.9371 32.0894C46.6918 32.0894 48.9249 29.7689 48.9249 26.9063C48.9249 24.0437 46.6918 21.7231 43.9371 21.7231C41.1824 21.7231 38.9492 24.0437 38.9492 26.9063C38.9492 29.7689 41.1824 32.0894 43.9371 32.0894Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M46.2841 14.7869H35.7949V7.16467H41.0028C43.9369 7.16467 46.2841 9.60379 46.2841 12.6527V14.7869Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            fill="white"
            height="32.961"
            width="54"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TransferIcon;
