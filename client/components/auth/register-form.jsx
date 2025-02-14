"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TextInput from "@/common/form-inputs/text-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/auth-schema";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { signup } from "@/services/auth-service";
import toast from "react-hot-toast";

export function RegisterForm({ className }) {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const { data } = await signup(values);
      toast.success(data?.message);
    } catch (err) {
      console.log("Error: ", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your details to create an account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              name="firstname"
              placeholder="Enter first name."
              label="First Name"
              control={form.control}
            />
            <TextInput
              name="lastname"
              placeholder="Enter last name."
              label="Last Name"
              control={form.control}
            />
          </div>
          <div className="grid gap-2">
            <TextInput
              name="username"
              placeholder="Enter email."
              label="Username"
              control={form.control}
            />
          </div>
          <div className="grid gap-2">
            <TextInput
              name="password"
              placeholder="Enter password."
              label="Password"
              type="password"
              control={form.control}
            />
          </div>
          <div className="grid gap-2">
            <TextInput
              name="confirmPassword"
              placeholder="Confirm your password."
              label="Confirm Password"
              type="password"
              control={form.control}
            />
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
