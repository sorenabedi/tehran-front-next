"use client";
import { useGlobalStore, useUserStore } from "@/store";
import { cancelToken, fetcher } from "@/utilities/fetcher";
import ErrorView from "@/views/error";
import { CancelTokenSource } from "axios";
import { usePathname, useRouter } from "next/navigation";
import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { checkAuthentication, user } = useUserStore(
    ({ checkAuthentication, user }) => ({ checkAuthentication, user })
  );
  const { LoadingLayoutShow, LoadingLayoutHide } = useGlobalStore();

  const activePath = useMemo(() => {
    if (pathname === "/panel") return "dashboard";
    if (pathname.startsWith("/panel/contacts")) return "contacts";
    if (pathname.startsWith("/panel/patients")) return "patients";
    if (pathname.startsWith("/panel/users")) return "users";
    if (pathname.startsWith("/panel/reports")) return "reports";
    if (pathname.startsWith("/auth")) return "auth";
    return "";
  }, [pathname]);

  const getUserData = useCallback(
    async (CancelTokenSource: CancelTokenSource) => {
      try {
        await checkAuthentication(CancelTokenSource);
        if (["", "auth"].includes(activePath)) router.push("/panel");
      } catch (error) {
        console.error("Error:", (error as Error)?.message);
        if (!["", "auth"].includes(activePath)) router.push("/auth/signin");
      }
    },
    [
      LoadingLayoutShow,
      LoadingLayoutHide,
      activePath,
      router,
      checkAuthentication,
    ]
  );
  useEffect(() => {
    const source = cancelToken.source();
    getUserData(source);
    return () => source.cancel("Authentication check canceled ...");
  }, [JSON.stringify(user || {})]);

  // if (process.env.NODE_ENV) return <>{children}</>;
  if (user) {
    if (["SUPERVISOR", "ADMIN"].includes(user.role)) return <>{children}</>;
    if (
      user.role === "CONSULTANT" &&
      ["dashboard", "patients"].includes(activePath)
    )
      return <>{children}</>;
    if (
      user.role === "OPERATOR" &&
      ["dashboard", "contacts"].includes(activePath)
    )
      return <>{children}</>;
    return <ErrorView type='forbidden' />;
  } else {
    if (["", "auth"].includes(activePath)) return <>{children}</>;
    return <></>;
  }
};

export default AuthLayout;
