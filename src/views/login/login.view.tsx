import { ThemeToggler } from "@/components/theme";
import { UserAuthForm } from "./userAuthForm";
import { LoadingLogo } from "@/components/loadingLogo";

export default function LoginView() {
  return (
    <>
      <div className='min-h-dvh flex justify-center items-center p-5 relative'>
        <div className='max-w-screen-sm md:max-w-screen-md w-full flex flex-col gap-12 md:flex-row-reverse items-center rounded-xl overflow-hidden'>
          <LoadingLogo className='md:mb-3 md:w-80' />
          <div className='w-full max-w-xs md:w-2/3 md:max-w-md'>
            <UserAuthForm className='w-full mx-auto p-4 bg-background bg-opacity-80 rounded-lg' />
          </div>
        </div>
        <ThemeToggler />
      </div>
    </>
  );
}
