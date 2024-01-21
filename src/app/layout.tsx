import { Metadata } from "next";
import MasterLayout from "@/layouts/master/master.layout";
import "@/scss/global.scss";

export const metadata: Metadata = {
  title: "Teyran Kasht",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MasterLayout>{children}</MasterLayout>;
}
