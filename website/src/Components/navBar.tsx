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
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { AgiloHubIcon } from "./AgiloHubIcon";

const RegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
  email: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 mt-5 text-white placeholder:text-white focus-visible:ring-yellow"
        id="create-account"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Forename" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Surname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Create password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
      </form>
    </Form>
  );
}

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
    </NavigationMenu>
  );
}
