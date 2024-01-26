"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { FunctionComponent } from "react";
import { SunSvg, LaptopSvg, MoonSvg } from "@/icons";

const ThemeToggler: FunctionComponent = () => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='absolute bottom-2.5 right-2.5 opacity-5 hover:opacity-100'
      >
        <Button variant='outline' size='icon'>
          <SunSvg className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonSvg className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='center'
        className='min-w-2 mb-1 flex flex-col gap-2'
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={clsx(
            theme === "light" && "bg-accent text-accent-foreground"
          )}
        >
          <SunSvg />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={clsx(
            theme === "dark" && "bg-accent text-accent-foreground"
          )}
        >
          <MoonSvg />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={clsx(
            theme === "system" && "bg-accent text-accent-foreground"
          )}
        >
          <LaptopSvg />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

ThemeToggler.displayName = "ThemeToggler";
export default ThemeToggler;
