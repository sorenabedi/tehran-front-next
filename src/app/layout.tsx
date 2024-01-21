import { Metadata } from "next";
import MasterLayout from "@/layouts/master/master.layout";
import "@/scss/global.scss";
import { BackgroundPatternLayout } from "@/layouts/backgroundPattern";

export const metadata: Metadata = {
  title: "Teyran Kasht",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MasterLayout>
      <BackgroundPatternLayout>{children}</BackgroundPatternLayout>
    </MasterLayout>
  );
}
