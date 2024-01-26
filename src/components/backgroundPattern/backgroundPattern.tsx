"use client";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import backgroundPatternDarkSvg from "@/assets/images/background-pattern-dark.svg";
import backgroundPatternLightSvg from "@/assets/images/background-pattern-light.svg";
import { useTheme } from "next-themes";
import clsx from "clsx";

const BackgroundPattern: FunctionComponent = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Image
        className={clsx(
          "h-screen w-full fixed inset-0 -z-10 object-cover transition-opacity",
          resolvedTheme !== "dark" ? "opacity-100" : "opacity-0"
        )}
        src={backgroundPatternLightSvg}
        alt='Teyran background pattern'
        priority
        width={1422}
        height={800}
        lang='eager'
      />
      <Image
        className={clsx(
          "h-screen w-full fixed inset-0 -z-10 object-cover transition-opacity",
          resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
        )}
        src={backgroundPatternDarkSvg}
        alt='Teyran background pattern'
        priority
        width={1422}
        height={800}
        lang='eager'
      />
    </>
  );
};

BackgroundPattern.displayName = "BackgroundPattern";
export default BackgroundPattern;
