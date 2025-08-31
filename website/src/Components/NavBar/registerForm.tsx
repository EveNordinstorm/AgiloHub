import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
