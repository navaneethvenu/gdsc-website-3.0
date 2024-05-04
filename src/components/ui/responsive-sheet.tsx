import * as React from "react";

import { cn } from "@/lib/utils";
import Button from "@/components/Button";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useIsSmallScreen from "../hooks/useIsSmallScreen";

interface ResponsiveSheetProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

function Content() {
  return <div></div>;
}

export function ResponsiveSheet({ trigger, content }: ResponsiveSheetProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile: boolean = useIsSmallScreen();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="bg-backgroundSecondary flex flex-col justify-between max-h-[90%] border-borderPrimary">
          {content}

          <DrawerFooter className="bg-backgroundSecondary pt-4 border-solid border-borderPrimary border-t-[1px]">
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent className="bg-backgroundSecondary p-0 flex flex-col gap-0 justify-between border-borderPrimary">
        {content}
        <SheetFooter className="bg-backgroundSecondary p-4 border-solid border-borderPrimary border-t-[1px]">
          <SheetClose asChild>
            <Button variant="secondary">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
