"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { actionLoginUser } from "@/lib/server-action/auth-action";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Loader from "@/components/global/loader";
import Link from "next/link";

// Define form validation schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError("");

    const response = await actionLoginUser(values);

    if (response.error) {
      setError(response.error);
      setLoading(false);
    } else {
      router.push("/home"); // Redirect to a dashboard or home page
    }
  };

  return (
    <div className="flex justify-center sm:items-center md:min-h-screen mt-10 md:mt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border p-8 rounded-xl"
        >
          {/* Email Field */}
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
          {error && <FormMessage>{error}</FormMessage>}

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full">
            {!loading ? "Login" : <Loader />}
          </Button>
          <div>
            <span className="self-container">
              Dont have an account?{" "}
              <Link href="/signup" className="text-primary">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
