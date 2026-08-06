"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  Select,
  ListBox,
} from "@heroui/react";
import { authClient, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      ...user,
    });
    if (error) {
      toast.error(error.message || "Register failed!");
      return;
    }
    if (data) {
      await authClient.signOut();
      toast.success("Registered successfully! Please login");

      router.push("/auth/login");

      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border p-6">
        <h1 className="mb-1 text-2xl font-bold">Create an account</h1>
        <p className="mb-6 text-sm text-foreground/60">
          Join ReSell Hub to buy and sell pre-owned products
        </p>

        <Form onSubmit={handleSubmit} className="space-y-4">
          <Select
            isRequired
            name="role"
            className="w-full"
            placeholder="Select account type"
          >
            <Label>Register as</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="buyer" textValue="buyer">
                  Buyer
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="seller" textValue="seller">
                  Seller
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          <TextField isRequired name="name" value={name} onChange={setName}>
            <Label>Full Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            type="email"
            name="email"
            value={email}
            onChange={setEmail}
          >
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
            <FieldError />
          </TextField>

          <TextField name="image">
            <Label>Profile Image URL</Label>
            <Input placeholder="Enter image URL" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            type="password"
            name="password"
            value={password}
            onChange={setPassword}
            minLength={6}
          >
            <Label>Password</Label>
            <Input placeholder="At least 6 characters" />
            <FieldError />
          </TextField>

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </Form>

        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-foreground/50">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
