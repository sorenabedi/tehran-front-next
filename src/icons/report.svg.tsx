import type { SvgIconProps } from "@/types";
import React, { FunctionComponent } from "react";

const ReportSvg: FunctionComponent<SvgIconProps> = ({ ...props }) => {
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
        strokeLinejoin='round'
        strokeWidth='2'
      >
        <path
          fill='currentColor'
          fillOpacity='.3'
          d='M20 6V5C20 4.45 19.55 4 19 4H5C4.45 4 4 4.45 4 5V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19zM8 8h8M8 12h8M8 16h5'
        >
          <animateMotion
            fill='freeze'
            calcMode='linear'
            dur='0.4s'
            path='M0 0l2-2'
          />
        </path>
        <path
          strokeDasharray='34'
          strokeDashoffset='34'
          d='M2 6V21C2 21.55 2.45 22 3 22H18'
        >
          <animate
            fill='freeze'
            attributeName='stroke-dashoffset'
            begin='0.4s'
            dur='0.4s'
            values='34;68'
          />
        </path>
      </g>
    </svg>
  );
};

export default ReportSvg;
