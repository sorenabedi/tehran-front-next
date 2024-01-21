import FontIranYekanX from "@/components/fonts/iranYekan.font";
import { ThemeProvider } from "@/components/theme";
import { Toaster } from "@/components/ui/sonner";
import clsx from "clsx";

function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fa-IR' className={clsx(FontIranYekanX.variable)} dir='rtl'>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
export default MasterLayout;
