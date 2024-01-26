import { ThemeToggler } from "@/components/theme";
import LoadingLogo from "@/components/loadingLogo";
import { UserAuthPanel } from "./userAuthPanel";
import { FunctionComponent } from "react";

const SigninView: FunctionComponent = () => {
  return (
    <>
      <div className='min-h-dvh flex justify-center items-center p-5 relative'>
        <div className='max-w-screen-sm md:max-w-screen-md w-full flex flex-col gap-12 md:flex-row-reverse items-center rounded-xl'>
          <LoadingLogo className='md:mb-3 md:w-80' />
          <div className='w-full max-w-xs md:w-2/3 md:max-w-md overflow-hisdden'>
            <UserAuthPanel />
          </div>
        </div>
        <ThemeToggler />
      </div>
    </>
  );
};
SigninView.displayName = "SigninView";
export default SigninView;
