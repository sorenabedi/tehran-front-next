import ChartDemo from "@/components/chart/chartDemo";
import { Navbar } from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PanelLayout from "@/layouts/panel";
import { FunctionComponent } from "react";
import ContactCreateView from "./contactCreateView";
import ContactListView from "./contactListView";

const ContactsView: FunctionComponent = () => {
  return (
    <>
      <Tabs
        dir='rtl'
        defaultValue='list'
        className='flex-1 overflow-hidden h-full flex flex-col'
      >
        <Navbar>
          <div className='flex gap-2.5'>
            <h1 className="font-medium mie-5">مخاطبین</h1>
            <TabsList className='w-full p-0.5'>
              <TabsTrigger value='list' className='w-full text-xs py-1'>
                لیست مخاطبین
              </TabsTrigger>
              <TabsTrigger value='create' className='w-full text-xs py-1'>
                افزودن مخاطب جدید
              </TabsTrigger>
            </TabsList>
          </div>
        </Navbar>

        <TabsContent value='create' asChild>
          <ContactCreateView />
        </TabsContent>
        <TabsContent
          value='list'
          asChild
          className='flex-col h-full gap-2.5 overflow-hidden'
        >
          <ContactListView />
        </TabsContent>
      </Tabs>
    </>
  );
};
ContactsView.displayName = "ContactsView";
export default ContactsView;
