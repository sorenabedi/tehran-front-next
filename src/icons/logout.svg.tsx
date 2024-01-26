import type { SvgIconProps } from "@/types";
import React, { FunctionComponent } from "react";

const LogoutSvg: FunctionComponent<SvgIconProps> = ({ ...props }) => {
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
        strokeLinecap='round'
        strokeWidth='2'
      >
        <path
          strokeDasharray='46'
          strokeDashoffset='46'
          d='M16 5V4C16 3.44772 15.5523 3 15 3H6C5.44771 3 5 3.44772 5 4V20C5 20.5523 5.44772 21 6 21H15C15.5523 21 16 20.5523 16 20V19'
        >
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            dur='0.5s'
            values='46;0'
          />
        </path>
        <path
          strokeDasharray='12'
          strokeDashoffset='12'
          d='M10 12h11'
          opacity='0'
        >
          {/* @ts-ignore-nextLine */}
          <set attributeName='opacity' begin='0.6s' to='1' />
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.6s'
            dur='0.2s'
            values='12;0'
          />
        </path>
        <path
          strokeDasharray='6'
          strokeDashoffset='6'
          d='M21 12l-3.5 -3.5M21 12l-3.5 3.5'
          opacity='0'
        >
          {/* @ts-ignore-nextLine */}
          <set attributeName='opacity' begin='0.8s' to='1' />
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.8s'
            dur='0.2s'
            values='6;0'
          />
        </path>
      </g>
    </svg>
  );
};

export default LogoutSvg;
