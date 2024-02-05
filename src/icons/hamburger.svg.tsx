import type { SvgIconProps } from "@/types";
import React, { FunctionComponent } from "react";

const HamburgerSvg: FunctionComponent<SvgIconProps> = ({ ...props }) => {
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
        strokeWidth='1.5'
        d='M20 7H4m16 5H4m16 5H4'
      />
    </svg>
  );
};

export default HamburgerSvg;
