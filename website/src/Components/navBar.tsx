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

export function NavBar() {
  return (
    <NavigationMenu>
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
            <NavigationMenuLink asChild>
              <Link href="/store">Subscription Tiers</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/store">Products</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/store">Customer Service</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink asChild>
              <Link href="/account">Account</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/account">Projects</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/account">Tasks</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/account">Manage Membership</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/account">My Points</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
