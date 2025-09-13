"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "common/utils/api";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
import { LoginForm } from "./loginForm";
import { useAppSelector } from "common/src/hooks/hooks";
import { useAppDispatch } from "common/src/hooks/hooks";
import { RootState } from "common/src/redux/store";
import { logout } from "common/redux/slices/authSlice";

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <nav className="fixed w-full bg-primary-blue text-white font-semibold md:text-lg py-1 z-50">
      <div className="flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <AgiloHubIcon className="text-white h-10 my-2 hover:cursor-pointer" />
        </Link>

        {/* Single NavigationMenu */}
        <NavigationMenu>
          {/* Desktop Menu */}
          <NavigationMenuList className="hidden md:flex flex-row space-x-4">
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
                <div className="flex flex-col">
                  <NavigationMenuLink asChild>
                    <Link href="/store">Subscription Tiers</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/store">Products</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/store">Customer Service</Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Account</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col">
                  <NavigationMenuLink asChild>
                    <Link href="/account">Account</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/account">Projects</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/account">Tasks</Link>
                  </NavigationMenuLink>
                  {user && (
                    <NavigationMenuLink asChild>
                      <button
                        onClick={async () => {
                          try {
                            // tclear the cookie
                            await api.post("/auth/logout");
                          } catch (e) {
                            console.error("Failed to log out on server", e);
                          } finally {
                            // clear Redux state locally
                            dispatch(logout());
                            router.push("/");
                          }
                        }}
                        className="bg-black text-white hover:bg-black/70 px-3 py-1 rounded"
                      >
                        Log Out
                      </button>
                    </NavigationMenuLink>
                  )}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <NavigationMenuList className="md:hidden flex flex-col space-y-2 bg-primary-blue text-white px-4 pb-4">
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
                  <div className="flex flex-col">
                    <NavigationMenuLink asChild>
                      <Link href="/store">Subscription Tiers</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/store">Products</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/store">Customer Service</Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Account</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col">
                    <NavigationMenuLink asChild>
                      <Link href="/account">Account</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/account">Projects</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/account">Tasks</Link>
                    </NavigationMenuLink>
                    {user && (
                      <NavigationMenuLink asChild>
                        <button
                          onClick={async () => {
                            try {
                              // tclear the cookie
                              await api.post("/auth/logout");
                            } catch (e) {
                              console.error("Failed to log out on server", e);
                            } finally {
                              // clear Redux state locally
                              dispatch(logout());
                              router.push("/");
                            }
                          }}
                          className="bg-black text-white hover:bg-black/70 px-3 py-1 rounded"
                        >
                          Log Out
                        </button>
                      </NavigationMenuLink>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          )}
        </NavigationMenu>

        {/* Right Buttons */}
        <div className="flex items-center space-x-2">
          {!user && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-dark-blue hover:cursor-pointer hover:bg-dark-purple transition-colors ease-in font-bold text-base ml-3 rounded px-4 py-1.5">
                  Login
                </button>
              </DialogTrigger>

              <DialogContent className="!h-[80vh] !max-h-[80vh] !w-[90vw] !max-w-[90vw] overflow-y-auto border-none bg-dark-blue text-neutral-900">
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
                      {isLogin ? "Log in to your account" : "Create an account"}
                    </DialogTitle>

                    <DialogDescription className="text-yellow lg:text-md">
                      {isLogin ? (
                        <>
                          Don’t have an account?{" "}
                          <span
                            onClick={() => setIsLogin(false)}
                            className="underline font-semibold hover:cursor-pointer hover:text-white"
                          >
                            Sign up
                          </span>
                        </>
                      ) : (
                        <>
                          Already have an account?{" "}
                          <span
                            onClick={() => setIsLogin(true)}
                            className="underline font-semibold hover:cursor-pointer hover:text-white"
                          >
                            Log in
                          </span>
                        </>
                      )}
                    </DialogDescription>

                    {isLogin ? (
                      <LoginForm onSuccess={() => setDialogOpen(false)} />
                    ) : (
                      <RegisterForm onSuccess={() => setDialogOpen(false)} />
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-dark-blue/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
}
