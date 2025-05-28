"use client";

import React, { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";

// Define form schema with zod
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function SigninPage() {
  // State to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // First try client-side signin with Firebase
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to sign in");
      }

      // Create a session with the token
      if (result.token) {
        // Exchange the custom token for an ID token
        const { auth } = await import("@/firebase");
        const { signInWithCustomToken } = await import("firebase/auth");

        // Sign in with the custom token
        const userCredential = await signInWithCustomToken(auth, result.token);

        // Get the ID token
        const idToken = await userCredential.user.getIdToken();

        // Create a session with the ID token
        const sessionResponse = await fetch("/api/auth/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
          }),
        });

        if (!sessionResponse.ok) {
          throw new Error("Failed to create session");
        }
      }

      toast.success("Signed in successfully!");

      // Redirect to homepage
      window.location.href = "/";
    } catch (error: unknown) {
      console.error("Signin error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to sign in";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div
        className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg"
        style={{
          backgroundColor: "rgba(32, 32, 36, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="flex justify-center">
          <Logo />
        </div>

        <h2 className="text-xl font-semibold text-center">
          Practice job interview with AI
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your email address"
                      {...field}
                      className="bg-muted rounded-md"
                      style={{ backgroundColor: "rgba(45, 45, 50, 0.8)" }}
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
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="bg-muted rounded-md pr-10"
                        style={{ backgroundColor: "rgba(45, 45, 50, 0.8)" }}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-primary hover:bg-opacity-90"
              style={{ backgroundColor: "#b6b9ff", color: "#1a1b26" }}
            >
              Sign in
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          No account yet?{" "}
          <Link
            href="/signup"
            className="font-medium hover:underline"
            style={{ color: "#b6b9ff" }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
