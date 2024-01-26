import type { SvgIconProps } from "@/types";
import React, { FunctionComponent } from "react";

const ChevronDownSvg: FunctionComponent<SvgIconProps> = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='m19 9l-7 6l-7-6'
      />
    </svg>
  );
};

export default ChevronDownSvg;
