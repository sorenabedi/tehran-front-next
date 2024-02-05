"use client";

import PanelLayout from "@/layouts/panel";
import clsx from "clsx";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  PropsWithoutRef,
} from "react";
import type { Props as ReactApexChartProps } from "react-apexcharts";
import chartLocale from "apexcharts/dist/locales/fa.json";
import LoadingIndicator from "../loadingIndicator";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  loading: () => <LoadingIndicator />,
  ssr: false,
});

interface TRChart extends ReactApexChartProps {
  title?: string;
}

const Chart: FunctionComponent<TRChart> = ({
  className,
  options,
  width,
  height,
  title,
  ...props
}) => {
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={clsx(
        "p-4 inline-block bg-background bg-opacity-80 rounded flex justify-around items-center flex-col min-h-96 min-w-96 w-12/12",
        className
      )}
    >
      <h3 className='w-full font-medium text-lg text-center'>{title}</h3>
      <ReactApexChart
        options={{
          stroke: {
            curve: "smooth",
          },
          markers: { size: 1 },
          ...options,
          theme: { mode: resolvedTheme as "light" | "dark" },
          fill: {
            gradient: {
              opacityFrom: 0.55,
              opacityTo: 0,
            },
          },
          colors: ["#d87607", "#0081ff", "#0fa968", "#7916ff", "#ca0c47"].sort(
            () => 0.5 - Math.random()
          ),
          chart: {
            ...(options?.chart || {}),
            locales: [chartLocale],
            defaultLocale: "fa",
            toolbar: { ...(options?.chart?.toolbar || {}), show: false },
            fontFamily: "inherit",
            background: "inherit",
            // brush: {
            //   target: "chart2",
            //   enabled: true,
            // },
          },
        }}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};
Chart.displayName = "Chart";
export default Chart;
