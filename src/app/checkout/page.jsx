"use client";

import { useCart } from "@/context/CartContext";
import { authClient } from "@/lib/auth-client";
import {
  Surface,
  Button,
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  FieldError,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount } = useCart();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to continue.");
      router.push("/auth/login");
      return;
    }

    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const delivery = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    };

    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, delivery, buyerId: user.id }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error(data?.error || "Failed to start checkout.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (isPending) return null;

  if (!items.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
        <div className="mt-6 rounded-3xl border border-border bg-surface p-10 text-center">
          <p className="text-sm text-muted">
            Your cart is empty. Browse{" "}
            <Link href="/products" className="text-accent underline">
              All Products
            </Link>{" "}
            to add items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Checkout</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <Surface className="rounded-3xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-foreground">Order Summary</h2>

            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-background">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted">
                      ৳{item.price?.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted">Total Amount</span>
              <span className="text-xl font-bold text-foreground">
                ৳{totalAmount.toLocaleString()}
              </span>
            </div>
          </Surface>
        </div>

        {/* Delivery Info Form */}
        <div>
          <Surface className="rounded-3xl border border-border bg-surface p-5">
            <h2 className="font-semibold text-foreground">Delivery Information</h2>

            <Form onSubmit={onSubmit} className="mt-4">
              <Fieldset className="w-full">
                <Fieldset.Group className="gap-4">
                  <TextField
                    isRequired
                    name="name"
                    defaultValue={user?.name}
                    minLength={2}
                  >
                    <Label>Full Name</Label>
                    <Input variant="secondary" />
                    <FieldError />
                  </TextField>

                  <TextField isRequired name="phone" minLength={11}>
                    <Label>Phone Number</Label>
                    <Input placeholder="+8801XXXXXXXXX" variant="secondary" />
                    <FieldError />
                  </TextField>

                  <TextField isRequired name="address" minLength={10}>
                    <Label>Delivery Address</Label>
                    <Input placeholder="House, Road, Area, City" variant="secondary" />
                    <FieldError />
                  </TextField>
                </Fieldset.Group>

                <div className="mt-5 flex gap-2">
                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground"
                    isDisabled={loading}
                  >
                    {loading ? "Redirecting..." : "Proceed to Payment"}
                  </Button>
                </div>
              </Fieldset>
            </Form>
          </Surface>
        </div>
      </div>
    </div>
  );
}