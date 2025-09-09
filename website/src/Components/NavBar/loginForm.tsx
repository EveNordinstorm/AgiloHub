import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema, LoginFormValues } from "common/src/validation/auth";
import { loginUser } from "common/src/redux/slices/authSlice";
import { useAppDispatch } from "common/src/hooks/hooks";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const form = useForm<LoginFormValues>({
    // @ts-expect-error Zod 4 + RHF v7 type mismatch
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setServerError(null);
      await dispatch(loginUser(data)).unwrap();
      onSuccess?.();
    } catch (err: unknown) {
      let message = "Login failed";
      if (typeof err === "string") {
        message = err;
      } else if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "object" && err !== null && "error" in err) {
        message = (err as { error: string }).error;
      }
      setServerError(message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 mt-5 text-white placeholder:text-white focus-visible:ring-yellow"
        id="login"
      >
        {serverError && (
          <p className="bg-red-600 text-white font-semibold text-center rounded-sm py-0.5">
            {serverError}!
          </p>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl className="relative">
                <div>
                  <Input
                    placeholder="Enter password"
                    {...field}
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="w-full bg-yellow py-2 rounded text-black font-bold hover:cursor-pointer hover:bg-yellow/80"
        >
          Login
        </button>
      </form>
    </Form>
  );
}
