"use client";
import LoadingLogo from "@/components/loadingLogo";
import { useGlobalStore } from "@/store";
import clsx from "clsx";
import { FunctionComponent } from "react";
import LoadingOverlay, { LoadingOverLayProps } from "react-loading-overlay-ts";

export interface TRLoadingLayout {}
const LoadingLayout: FunctionComponent<TRLoadingLayout> = () => {
  const { loadingLayoutStatus } = useGlobalStore();
  return (
    <>
      <LoadingOverlay
        active={loadingLayoutStatus}
        styles={{
          wrapper: { flexDirection: "column-reverse", gap: "2rem" },
          overlay: {},
          spinner: () => ({
            position: "relative",
            margin: "0px auto 10px auto",
            width: "50px",
            maxHeight: "100%",
            "&:before": {
              content: '""',
              display: "block",
              paddingTop: "100%",
            },
            "& svg": {
              animation: `rotate360 2s linear infinite`,
              height: "100%",
              transformOrigin: "center center",
              width: "100%",
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              margin: "auto",
              "& circle": {
                animation: `spinnerDash 1.5s ease-in-out infinite`,
                strokeDasharray: "1,200",
                strokeDashoffset: 0,
                strokeLinecap: "round",
                stroke: "hsl(var(--foreground) / 50%)",
              },
            },
          }),
        }}
        className={clsx(
          "h-dvh w-full absolute inset-0 bg-background bg-opacity-90 backdrop-blur-sm transition-all flex flex-col justify-center items-center gap-2",
          loadingLayoutStatus
            ? "z-50"
            : "-z-1 opacity-0 select-none stroke-red-700"
        )}
      >
        <div className='w-full flex select-none text-foreground'>
          <LoadingLogo className='w-72' infinite={loadingLayoutStatus} />
        </div>
      </LoadingOverlay>
    </>
  );
};
LoadingLayout.displayName = "LoadingLayout";
export default LoadingLayout;
