import clsx from "clsx";
import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  PropsWithoutRef,
} from "react";
import { LoadingSvg } from "@/icons";

interface TRLoadingIndicator
  extends PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  > {}

const LoadingIndicator: FunctionComponent<TRLoadingIndicator> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "aspect-square inline-block max-w-72 mx-auto text-5xl p-10",
        className
      )}
      {...props}
    >
      <LoadingSvg />
    </div>
  );
};
LoadingIndicator.displayName = "LoadingIndicator";
export default LoadingIndicator;
