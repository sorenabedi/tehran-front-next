import { Metadata } from "next";
import MasterLayout from "@/layouts/master";
import "@/scss/global.scss";
import BackgroundPattern from "@/components/backgroundPattern";

export const metadata: Metadata = {
  title: "Teyran kasht",
  description: "Teyran beauty clinic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MasterLayout>
      <BackgroundPattern />
      <>{children}</>
    </MasterLayout>
  );
}
