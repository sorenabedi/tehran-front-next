"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { cn } from "@/lib/utils";

type TabsContext = {
  value: string;
  setValue: (value: string) => void;
  getDirection: (value: string) => -1 | 0 | 1;
};

const TabsContext = createContext<TabsContext>({
  value: "",
  setValue: () => {},
  getDirection: () => 0,
});

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      "Tabs compound components cannot be rendered outside the Tabs component"
    );
  }
  return context;
};

type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  resolveDirection?: (selected: string, current: string) => -1 | 0 | 1;
};

const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ resolveDirection, className, ...props }, ref) => {
    const [selectedItem = "", setSelectedItem] = useControllableState<string>({
      prop: props.value,
      defaultProp: props.defaultValue,
      onChange: props.onValueChange,
    });

    const getDirection = useCallback(
      (current: string) =>
        resolveDirection ? resolveDirection(selectedItem, current) : 0,
      [selectedItem, resolveDirection]
    );

    return (
      <TabsContext.Provider
        value={useMemo(
          () => ({
            value: selectedItem,
            setValue: setSelectedItem,
            getDirection,
          }),
          [selectedItem, setSelectedItem, getDirection]
        )}
      >
        <TabsPrimitive.Root
          ref={ref}
          {...props}
          value={selectedItem}
          onValueChange={setSelectedItem}
          className={cn("overflow-hidden", className)}
        />
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContentVariants = {
  entryHidden: (direction: -1 | 0 | 1) => ({
    x: direction * 382,
    opacity: 0,
  }),
  entryVisible: () => ({
    opacity: 1,
    x: 0,
  }),
};

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    withAnimation?: boolean;
  }
>(({ className, children, withAnimation, ...props }, ref) => {
  const { value, getDirection } = useTabsContext();
  const active = value === props.value;

  const direction = useMemo(
    () => getDirection(props.value),
    [getDirection, props.value]
  );

  return (
    <AnimatePresence initial mode='popLayout'>
      {active ? (
        <TabsPrimitive.Content
          ref={ref}
          className={cn(
            "mt-2 ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          forceMount={withAnimation ? true : undefined}
          {...props}
          asChild
        >
          <motion.div
            custom={direction}
            variants={TabsContentVariants}
            animate={active ? "entryVisible" : "entryHidden"}
            initial={active ? "entryVisible" : "entryHidden"}
            exit={!active ? "entryVisible" : "entryHidden"}
            // layout
            className='flex'
          >
            {children}
          </motion.div>
        </TabsPrimitive.Content>
      ) : null}
    </AnimatePresence>
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
