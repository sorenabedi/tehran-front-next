import { Navbar } from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FunctionComponent } from "react";
import PatientsListView from "./patientListView";

const PatientsView: FunctionComponent = () => {
  return (
    <>
      <Tabs
        dir='rtl'
        defaultValue='list'
        className='flex-1 overflow-hidden h-full flex flex-col'
      >
        <Navbar>
          <div className='flex gap-2.5'>
            <h1 className='font-medium mie-5 text-nowrap'>
              پرونده‌های بیماران
            </h1>
            <TabsList className='w-full p-0.5'>
              <TabsTrigger value='list' className='w-full text-xs py-1'>
                لیست پرونده‌های بیماران
              </TabsTrigger>
            </TabsList>
          </div>
        </Navbar>

        <TabsContent value='create' asChild></TabsContent>
        <TabsContent
          value='list'
          asChild
          className='flex-col h-full gap-2.5 overflow-hidden'
        >
          <PatientsListView />
        </TabsContent>
      </Tabs>
    </>
  );
};
PatientsView.displayName = "PatientsView";
export default PatientsView;
