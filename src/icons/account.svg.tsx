import type { SvgIconProps } from "@/types";
import React, { FunctionComponent } from "react";

const AccountSvg: FunctionComponent<SvgIconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeDasharray='28'
        strokeDashoffset='28'
        strokeLinecap='round'
        strokeWidth='2'
      >
        <path d='M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            dur='0.4s'
            values='28;0'
          />
        </path>
        <path d='M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z'>
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.5s'
            dur='0.4s'
            values='28;0'
          />
        </path>
      </g>
    </svg>
  );
};

export default AccountSvg;
