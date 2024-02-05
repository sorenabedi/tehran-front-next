import { Navbar } from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FunctionComponent } from "react";
import UserUpdateFormView from "./userUpdateView";

const UserUpdateView: FunctionComponent = () => {
  return (
    <>
      <Tabs
        dir='rtl'
        defaultValue='update'
        className='flex-1 overflow-hidden h-full flex flex-col'
      >
        <Navbar>
          <div className='flex gap-2.5'>
            <h1 className='font-medium mie-5'>کاربران</h1>
            {/* <TabsList className='w-full p-0.5'>
              <TabsTrigger value='list' className='w-full text-xs py-1'>
                لیست کاربران
              </TabsTrigger>
              <TabsTrigger value='create' className='w-full text-xs py-1'>
                افزودن کاربر جدید
              </TabsTrigger>
            </TabsList> */}
          </div>
        </Navbar>
        <TabsContent
          value='update'
          asChild
          className='flex-col h-full gap-2.5 overflow-hidden'
        >
          <UserUpdateFormView />
        </TabsContent>
      </Tabs>
    </>
  );
};
UserUpdateView.displayName = "UserUpdateView";
export default UserUpdateView;
