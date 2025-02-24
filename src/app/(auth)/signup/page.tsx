"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { actionSignUpUser } from "@/lib/server-action/auth-action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/global/loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";

// Define form validation schema
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUpPage() {
  const [confirmation, setConfirmation] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: "", email: "", password: "" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError("");

    const response = await actionSignUpUser(values);

    setLoading(false);

    if (response.error) {
      setError(response.error);
      form.reset();
    } else {
      setConfirmation(true); // Redirect to login page
    }
  };

  return (
    <div className="flex justify-center sm:items-center md:min-h-screen mt-10 md:mt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border p-8 rounded-xl"
        >
          {/* Username Field */}
          <Link
            href="/"
            className="
          w-full
          flex
          justify-left
          items-center"
          >
            <span
              className="font-bold
          dark:text-white text-4xl"
            >
              CritQ
            </span>
          </Link>
          <FormDescription
            className="
        text-foreground/60"
          >
            Your review common place for every product bought online.
          </FormDescription>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full">
            {!loading ? "Sign up" : <Loader />}
          </Button>
          <div>
            <span className="self-container">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
          {confirmation && (
            <Alert className="mt-4">
              <MailCheck className="h-4 w-4" />
              <AlertTitle>Check your email.</AlertTitle>
              <AlertDescription>
                An email confirmation has been sent.
              </AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </div>
  );
}
