import ChartDemo from "@/components/chart/chartDemo";
import { Navbar } from "@/components/navigation";
import { FunctionComponent } from "react";

const DashboardView: FunctionComponent = () => {
  return (
    <>
      <Navbar>
        <h1 className='font-medium mie-5'>نمایش وضعیت عملکرد مشاورین</h1>
      </Navbar>
      <div className='flex flex-wrap gap-x-2.5 gap-y-5 justify-around items-center'>
        <ChartDemo />
      </div>
    </>
  );
};
DashboardView.displayName = "DashboardView";
export default DashboardView;
