"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-separator p-6">
        <h1 className="mb-1 text-2xl font-bold">Welcome back</h1>
        <p className="mb-6 text-sm text-foreground/60">
          Login to your ReSell Hub account
        </p>

        <Form onSubmit={handleSubmit} className="space-y-4">
          <TextField isRequired type="email" name="email" value={email} onChange={setEmail}>
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            type="password"
            name="password"
            value={password}
            onChange={setPassword}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <FieldError />
          </TextField>

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>

        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-separator" />
          <span className="text-xs text-foreground/50">OR</span>
          <div className="h-px flex-1 bg-separator" />
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-foreground/60">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-accent">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}