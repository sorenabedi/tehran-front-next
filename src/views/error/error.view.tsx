"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface TRErrorView {
  type?: "forbidden" | "notFound";
}

const ErrorView: FunctionComponent<TRErrorView> = ({ type = "notFound" }) => {
  const router = useRouter();
  const user = useUserStore(({ user }) => user);

  return (
    <div className='min-h-dvh w-full flex flex-col justify-center items-center gap-3'>
      <h1 className='text-2xl font-bold'>
        {type === "notFound" && " صفحه درخواستی در دسترس نیست!"}
        {type === "forbidden" && "دسترسی به صفحه درخواستی امکان پذیر نیست!"}
      </h1>
      <div className='flex flex-wrap justify-center items-center gap-2.5 mt-5'>
        <Button variant='secondary' onClick={() => router.back()}>
          بازگشت
        </Button>

        {user ? (
          <Button variant='secondary' onClick={() => router.replace("/panel")}>
            بازگشت به پنل
          </Button>
        ) : (
          <Button
            variant='secondary'
            onClick={() => router.replace("/auth/signin")}
          >
            ورود به سامانه
          </Button>
        )}
      </div>
    </div>
  );
};
ErrorView.displayName = "ErrorView";
export default ErrorView;
