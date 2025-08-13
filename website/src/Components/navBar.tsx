"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AgiloHubIcon } from "./AgiloHubIcon";

export function NavBar() {
  return (
    <NavigationMenu className="bg-primary-blue text-white font-semibold md:text-lg py-1">
      <Link href="/" className="absolute left-4">
        <AgiloHubIcon className="text-white h-10 my-2 hover:cursor-pointer" />
      </Link>

      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Store</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              asChild
              className="bg-primary-blue hover:bg-dark-blue/20 transition-colors ease-in-out"
            >
              <Link href="/store">Subscription Tiers</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className="bg-primary-blue hover:bg-dark-blue/20 transition-colors ease-in-out"
            >
              <Link href="/store">Products</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className="bg-primary-blue hover:bg-dark-blue/20 transition-colors ease-in-out"
            >
              <Link href="/store">Customer Service</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              asChild
              className="bg-primary-blue hover:bg-dark-blue/20 transition-colors ease-in-out"
            >
              <Link href="/account">Account</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className="bg-primary-blue hover:bg-dark-blue/20 transition-colors ease-in-out"
            >
              <Link href="/account">Projects</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className="bg-primary-blue hover:bg-dark-blue/20 transition-colors ease-in-out"
            >
              <Link href="/account">Tasks</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className="bg-primary-blue hover:bg-dark-blue/20 transition-colors ease-in-out"
            >
              <Link href="/account">Membership</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className="bg-primary-blue hover:bg-dark-blue/20 transition-colors ease-in-out"
            >
              <Link href="/account">My Points</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
