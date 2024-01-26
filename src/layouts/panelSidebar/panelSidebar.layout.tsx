import clsx from "clsx";
import { Sidebar } from "@/components/navigation";
import { FunctionComponent, PropsWithChildren } from "react";
import PanelLayout from "../panel";

export interface RTNavbarLayout extends PropsWithChildren {}
const NavbarLayout: FunctionComponent<RTNavbarLayout> = ({ children }) => {
  return (
    <div
      className='h-dvh flex gap-2.5 relative px-5 overflow-hidden'
      suppressHydrationWarning
    >
      <aside className='h-dvh flex-shrink-0 h-full py-5 flex flex-col overflow-auto'>
        <Sidebar />
      </aside>

      <div className='h-dvh w-full h-full py-5 flex flex-col gap-3 overflow-auto'>
        {children}
      </div>
    </div>
  );
};
NavbarLayout.displayName = "NavbarLayout";
export default NavbarLayout;
