import React, { ReactElement } from 'react';

interface IStopIconProps {
  className?: string;
  title: string;
}

const StopIcon = (props: IStopIconProps): ReactElement => {
  const { title } = props;

  return (
    <svg
      fill="none"
      height="59"
      viewBox="0 0 37 59"
      width="37"
      xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <g clipPath="url(#clip0)">
        <path
          d="M0.782227 38.6582V16.3837C0.782227 14.0826 2.34671 12.2417 4.30231 12.2417H4.69343C6.64903 12.2417 8.21352 14.0826 8.21352 16.3837V29.638"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M8.13525 25.0358V8.37585C8.13525 6.07476 9.69974 4.23389 11.6553 4.23389H12.0465C14.0021 4.23389 15.5665 6.07476 15.5665 8.37585V25.1278"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M22.8413 26.9686V10.2167C22.8413 7.91558 24.4058 6.07471 26.3614 6.07471H26.7525C28.7081 6.07471 30.2726 7.91558 30.2726 10.2167V21.0778"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M36.2177 38.6585V25.2201C36.2177 22.919 34.6532 21.0781 32.6976 21.0781H32.3065C30.3509 21.0781 28.7864 22.919 28.7864 25.2201V27.7053C28.7864 30.5586 28.7864 31.387 26.909 32.4915C25.3446 33.412 23.5454 35.529 23.5454 37.738V39.3028"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M15.4883 24.6677V5.06238C15.4883 2.76128 17.0528 0.92041 19.0084 0.92041H19.3995C21.3551 0.92041 22.9196 2.76128 22.9196 5.06238V24.6677"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M36.2177 38.5664C36.2177 49.4276 28.3171 58.1717 18.5391 58.1717C8.76109 58.1717 0.782227 49.3355 0.782227 38.5664"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            fill="white"
            height="59"
            width="37" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StopIcon;
