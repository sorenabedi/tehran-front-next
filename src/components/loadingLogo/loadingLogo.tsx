"use client";
import Image from "next/image";
import TeyranLogoGoldenBlackImage from "@/assets/images/logo-golden-black.png";
import TeyranLogoGoldenWhiteImage from "@/assets/images/logo-golden-white.png";
import { useTheme } from "next-themes";
import styles from "./loadingLogo.module.scss";
import clsx from "clsx";
import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  PropsWithoutRef,
} from "react";

interface TRLoadingLogo
  extends PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  > {
  infinite?: boolean;
}

const LoadingLogo: FunctionComponent<TRLoadingLogo> = ({
  infinite,
  className,
  ...props
}) => {
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={clsx(
        styles.loading,
        infinite ? styles.loop : styles.startup,
        "h-full w-full inline-block max-w-72 aspect-[1.11] mx-auto backdrop-blur-sm p-5 box-border rounded-xl bg-background bg-opacity-5 relative",
        className
      )}
      {...props}
    >
      <Image
        className={clsx(
          resolvedTheme !== "dark" && "opacity-0",
          styles.logoImage,
          "transition-opacity object-contain aspect-[1.11] mx-auto absolute inset-0"
        )}
        src={TeyranLogoGoldenWhiteImage}
        alt="Teyran's logo"
        quality={100}
        loading='eager'
      />
      <Image
        className={clsx(
          resolvedTheme !== "light" && "opacity-0",
          styles.logoImage,
          "transition-opacity object-contain aspect-[1.11] mx-auto absolute inset-0"
        )}
        src={TeyranLogoGoldenBlackImage}
        alt="Teyran's logo"
        quality={100}
        loading='eager'
      />
    </div>
  );
};
export default LoadingLogo;
