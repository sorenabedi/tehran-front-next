import clsx from "clsx";
import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  PropsWithoutRef,
} from "react";

interface TRPanelLayout
  extends PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  > {
  withBorder?: boolean;
}

const PanelLayout: FunctionComponent<TRPanelLayout> = ({
  children,
  className,
  withBorder,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "bg-background bg-opacity-90 backdrop-blur-sm py-2 rounded-xl",
        withBorder &&
          "border-0.5 border-solid border-foreground border-opacity-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PanelLayout;
