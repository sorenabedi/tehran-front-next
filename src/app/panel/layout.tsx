import PanelSidebarLayout from "@/layouts/panelSidebar";
import React, { FunctionComponent, PropsWithChildren } from "react";

const DashboardPageLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <PanelSidebarLayout>{children}</PanelSidebarLayout>;
};
DashboardPageLayout.displayName = "DashboardPageLayout";

export default DashboardPageLayout;
