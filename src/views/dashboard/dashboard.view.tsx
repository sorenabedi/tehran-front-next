"use client";
import ChartDemo from "@/components/chart/chartDemo";
import { Navbar } from "@/components/navigation";
import { useUserStore } from "@/store";
import { FunctionComponent } from "react";

const DashboardView: FunctionComponent = () => {
  const userRole = useUserStore((state) => state.user?.role);
  return (
    <>
      <Navbar>
        <h1 className='font-medium mie-5'>نمایش وضعیت عملکرد</h1>
      </Navbar>
      <div className='flex flex-wrap gap-x-2.5 gap-y-5 justify-around items-center flex-1 h-full'>
        {userRole !== "ADMIN" ? (
          <h3 className='font-semibold text-lg'>
            دسترسی به وضعیت عملکرد برای شما محدود است!
          </h3>
        ) : (
          <h3 className='font-semibold text-lg'>
            داده کافی برای تحلیل عملکرد مجموعه وجود ندارد!
          </h3>
        )}
      </div>
    </>
  );
};
DashboardView.displayName = "DashboardView";
export default DashboardView;
