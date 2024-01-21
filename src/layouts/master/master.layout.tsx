import FontIranYekanX from "@/components/fonts/iranYekan.font";

function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fa-IR' className={`${FontIranYekanX.variable}`} dir="rtl">
      <body>{children}</body>
    </html>
  );
}
export default MasterLayout;
