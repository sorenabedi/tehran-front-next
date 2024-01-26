import clsx from "clsx";
import { Navbar, Sidebar } from "@/components/navigation";
import { FunctionComponent, PropsWithChildren } from "react";
import type { ApexOptions } from "apexcharts";
import Chart from "@/components/chart/chart";
import { getRndInteger } from "@/utilities";

const LineChartData: {
  options: ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
} = {
  series: [
    {
      name: "مشاور ۱",
      data: [
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
      ],
    },
    {
      name: "مشاور ۲",

      data: [
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
        getRndInteger(0, 400),
      ],
    },
  ],
  options: {
    legend: { markers: { offsetX: 4 } },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:12.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    yaxis: {
      labels: {
        // style: {
        //   cssClass: "fill-foreground",
        // },
      },
    },
    tooltip: {
      enabled: true,
      shared: false,
      // cssClass: "!bg-background",
      followCursor: true,
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};
const pieChartData: {
  options: ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
} = {
  series: [
    getRndInteger(0, 400),
    getRndInteger(0, 400),
    getRndInteger(0, 400),
    getRndInteger(0, 400),
    getRndInteger(0, 400),
    getRndInteger(0, 400),
    getRndInteger(0, 400),
  ],
  options: {
    labels: [
      "مشاور ۱",
      "مشاور ۲",
      "مشاور ۳",
      "مشاور ۴",
      "مشاور ۵",
      "مشاور ۶",
      "مشاور ۷",
    ],
    legend: { markers: { offsetX: 4 } },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:12.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    yaxis: {
      labels: {
        // style: {
        //   cssClass: "fill-foreground",
        // },
      },
    },
    tooltip: {
      enabled: true,
      shared: false,
      // cssClass: "!bg-background",
      followCursor: true,
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

export interface RTChartDemo extends PropsWithChildren {}
const ChartDemo: FunctionComponent<RTChartDemo> = ({ children }) => {
  return (
    <>
      <Chart
        options={LineChartData.options}
        series={LineChartData.series}
        type='area'
        height={350}
        width='350'
      />
      <Chart
        options={LineChartData.options}
        series={LineChartData.series}
        type='bar'
        height={350}
        width='350'
      />
      <Chart
        title='وضعیت تماس های ۳ روز اخیر'
        options={pieChartData.options}
        series={pieChartData.series}
        type='pie'
        height={350}
        width='350'
      />
      <Chart
        title='وضعیت تماس های ۳ روز اخیر'
        options={LineChartData.options}
        series={LineChartData.series}
        type='line'
        height={350}
        width='350'
      />
    </>
  );
};
ChartDemo.displayName = "ChartDemo";
export default ChartDemo;
