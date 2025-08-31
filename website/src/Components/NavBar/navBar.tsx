"use client";

import { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { AgiloHubIcon } from "../Logos/AgiloHubIcon";
import { RegisterForm } from "./registerForm";

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-primary-blue text-white font-semibold md:text-lg py-1 z-50">
      <div className="flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <AgiloHubIcon className="text-white h-10 my-2 hover:cursor-pointer" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-row space-x-4">
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
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger className="bg-dark-blue hover:cursor-pointer hover:bg-dark-purple transition-colors ease-in font-bold text-base ml-3 rounded px-4 py-1.5">
              Login
            </DialogTrigger>
            <DialogContent
              className="!h-[80vh] !max-h-[80vh] !w-[90vw] !max-w-[90vw] overflow-y-auto border-none bg-dark-blue text-neutral-900"
              style={{
                minHeight: "80vh",
                minWidth: "80vw",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="md:grid grid-cols-2 gap-8 h-full">
                <div className="relative">
                  <Image
                    src="/stars-bg-01.svg"
                    alt="Background of stars in space"
                    fill
                    className="object-cover rounded-xl"
                    priority
                  />
                </div>
                <div>
                  <DialogTitle className="text-white text-xl md:text-3xl my-4">
                    Create an account
                  </DialogTitle>
                  <DialogDescription className="text-yellow lg:text-md">
                    Already have an account?{" "}
                    <span className="underline font-semibold hover:cursor-pointer hover:text-white">
                      Log in
                    </span>
                  </DialogDescription>
                  <RegisterForm />
                  <Button
                    className="w-full bg-primary-blue text-white font-bold hover:cursor-pointer hover:bg-dark-purple transition-colors ease-in my-6"
                    type="submit"
                    form="create-account"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-dark-blue/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary-blue text-white px-4 pb-4">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col space-y-2">
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
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </nav>
  );
}
