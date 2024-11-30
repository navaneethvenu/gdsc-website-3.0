import { Button as OldButton } from "@/components/ui/button";
import Button from "./Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar, { NavbarItem, NavbarLinks } from "./Navbar";

interface SideBarProps {
  className?: string;
}

export function SideBar({ className }: SideBarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <OldButton
          variant="outline"
          className={`${className} bg-transparent border-borderPrimary hover:bg-white/50 dark:hover:bg-white/10`}
          size={"icon"}
        >
          <span className="material-symbols-rounded">more_horiz</span>
        </OldButton>
      </SheetTrigger>
      <SheetContent className="bg-backgroundPrimary border-borderPrimary flex flex-col justify-between">
        <div className="flex flex-col">
          {NavbarLinks.map((link, index) => (
            <NavbarItem key={index} href={link.href}>
              {link.name}
            </NavbarItem>
          ))}
        </div>

        <div
          className={`buttonContainer flex flex-col w-full justify-center items-center gap-2`}
        >
          <Button className={"w-full"}>Become a member</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
