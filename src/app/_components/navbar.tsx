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
    <NavigationMenu className="sticky top-0 z-100 w-full min-w-full max-h-fit flex justify-between px-4 py-2 items-center bg-background shadow-lg backdrop-blur-xl">
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
        <NavigationMenuItem className="px-0">
          <NavigationMenuLink
            asChild
            className={`  ${navigationMenuTriggerStyle()}  px-1 sm:px-3  lg:px-4   `}>
            <Link href="/projects">
              <span className="  md:text-2xl font-mono  text-xs sm:text-lg">
                PROJECTS
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="px-0">
          <NavigationMenuLink
            asChild
            className={`  ${navigationMenuTriggerStyle()}  px-1 sm:px-3  lg:px-4   `}>
            <Link href="/About">
              <span className=" md:text-2xl font-mono text-xs sm:text-lg">
                ABOUT
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="px-0">
          <NavigationMenuLink
            asChild
            className={`  ${navigationMenuTriggerStyle()}  px-1 sm:px-3  lg:px-4   `}>
            <Link href="/github">
              <span className=" md:text-2xl font-mono text-xs sm:text-lg">
                GITHUB
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="px-0">
          <NavigationMenuLink
            asChild
            className={`  ${navigationMenuTriggerStyle()}  px-1 sm:px-3  lg:px-4   `}>
            <Link href="/contact">
              <span className=" md:text-2xl font-mono text-xs sm:text-lg">
                CONTACT
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="px-0">
          <DarkModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
