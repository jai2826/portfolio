import { DarkModeToggle } from "@/app/_components/DarkModeToggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
export const Navbar = () => {
  return (
    <NavigationMenu className="w-full min-w-full max-h-fit flex justify-between px-4 py-2 items-center bg-background ">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}>
            <Image
              src={"/react.svg"}
              alt="Logo"
              width={100}
              height={100}
            />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}>
            <Link href="/projects">
              <span className=" text-2xl font-mono ">
                PROJECTS
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}>
            <Link href="/About">
              <span className=" text-2xl font-mono">
                ABOUT
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}>
            <Link href="/github">
              <span className=" text-2xl font-mono">
                GITHUB
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}>
            <Link href="/contact">
              <span className=" text-2xl font-mono">
                CONTACT
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DarkModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
