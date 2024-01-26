"use client";
import { FunctionComponent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ChevronDownSvg, LogoutSvg } from "@/icons";
import { Button } from "../ui/button";
import { useUserStore } from "@/store";
import { Separator } from "../ui/separator";
import logoWhite from "@/assets/images/logo-white.png";

const UserActions: FunctionComponent = ({}) => {
  const { logoutUser, user } = useUserStore(({ logoutUser, user }) => ({
    logoutUser,
    user,
  }));
  return (
    <>
      <DropdownMenu dir='rtl'>
        <DropdownMenuTrigger>
          <Button variant='ghost' className='px-2 gap-2 group'>
            <ChevronDownSvg className='transition-transform -translate-x-6 group-hover:translate-x-0 group-focus:translate-x-0' />
            <Avatar className='w-7 h-7 aspect-square flex-shrink-0'>
              <AvatarImage src={user?.avatar || logoWhite.src} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-56 bg-opacity-20 backdrop-blur-sm'
        >
          <DropdownMenuLabel className='w-full flex justify-between items-center gap-2.5 px-1.5'>
            <Avatar className='w-12 h-12 aspect-square flex-shrink-0'>
              <AvatarImage src={user?.avatar || logoWhite.src} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='w-full flex flex-col w-32 text-center'>
              <span className='text-sm font-medium truncate overflow-hidden'>
                {user?.firstName} {user?.lastName}
              </span>
              <Separator className='mx-auto my-2 w-8/12 opacity-1005' />
              <span className='text-sm font-medium truncate overflow-hidden'>
                {user?.phoneNumber}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='focus:hover:bg-transparent py-0.5'>
            <Button
              className='w-full mx-auto justify-start'
              size='sm'
              variant='ghost'
            >
              ویرایش حساب کاربری
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className='focus:hover:bg-transparent py-0.5'>
            <Button
              className='w-full mx-auto justify-start !text-destructive'
              size='sm'
              variant='ghost'
              Icon={LogoutSvg}
              onClick={() => logoutUser()}
            >
              خروج از حساب کاربری
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
UserActions.displayName = "UserActions";
export default UserActions;
