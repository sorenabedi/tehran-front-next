import localFont from "next/font/local";

const FontIranYekanX = localFont({
  preload: true,
  adjustFontFallback: "Arial",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
  variable: "--font-iranYekan",
  src: [
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-Heavy.woff2",
      weight: "1000",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-ExtraBlack.woff2",
      weight: "950",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-UltraLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/IRANYekanX-pro/woff2/IRANYekanX-Thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  display: "swap",
});

export default FontIranYekanX;
