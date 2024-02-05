import ChartDemo from "@/components/chart/chartDemo";
import { Navbar } from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PanelLayout from "@/layouts/panel";
import { FunctionComponent } from "react";
import PatientCreateForm from "./patientCreateView";
import PatientUpdateForm from "./patientUpdateView";

const PatientCreateView: FunctionComponent<{ update?: boolean }> = ({
  update,
}) => {
  return (
    <>
      <Tabs
        dir='rtl'
        defaultValue='create'
        className='flex-1 overflow-hidden h-full flex flex-col'
      >
        <Navbar>
          <div className='flex gap-2.5'>
            <h1 className='font-medium mie-5 text-nowrap'>
              پرونده‌های بیماران
            </h1>
            {/* <TabsList className='w-full p-0.5'>
              <TabsTrigger value='list' className='w-full text-xs py-1'>
                ایجاد پرونده‌ بیمار
              </TabsTrigger>
            </TabsList> */}
          </div>
        </Navbar>
        <TabsContent
          value='create'
          asChild
          className='flex-col h-full gap-2.5 overflow-hidden'
        >
          {update ? <PatientUpdateForm /> : <PatientCreateForm />}
        </TabsContent>
      </Tabs>
    </>
  );
};
PatientCreateView.displayName = "PatientCreateView";
export default PatientCreateView;
