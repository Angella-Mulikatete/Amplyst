"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/use-toast";
import { USER_ROLES, ROLE_DISPLAY_NAMES, ROLE_ICONS } from "../../lib/constants";
import type { UserRole } from "../../types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(USER_ROLES as readonly [string, ...string[]], { // z.enum requires at least one value
    required_error: "You need to select a role.",
  }),
});

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "influencer",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate login
    login(values.email, values.role as UserRole);
    toast({
      title: "Login Successful",
      description: `Welcome back! You are logged in as ${ROLE_DISPLAY_NAMES[values.role as Exclude<UserRole, null>]}.`,
    });
    router.push("/dashboard");
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">Welcome Back to AmplyAI!</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Login as:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      {USER_ROLES.filter(role => role !== null).map((role) => {
                        const RoleIcon = ROLE_ICONS[role as Exclude<UserRole, null>];
                        return (
                          <FormItem key={role} className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={role!} />
                            </FormControl>
                            <Label className="font-normal flex items-center gap-1.5">
                              {RoleIcon && <RoleIcon className="h-4 w-4 text-muted-foreground" />}
                              {ROLE_DISPLAY_NAMES[role as Exclude<UserRole, null>]}
                            </Label>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </p>
        <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-primary hover:underline">
            Forgot password?
        </Link>
      </CardFooter>
    </Card>
  );
}
