"use client";

import { useCart } from "@/context/CartContext";
import { Surface, Button } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, totalAmount, totalItems } = useCart();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground">Cart</h1>
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
      <h1 className="text-2xl font-bold text-foreground">Cart</h1>
      <p className="mt-1 text-sm text-muted">
        {totalItems} item{totalItems === 1 ? "" : "s"} in your cart.
      </p>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <Surface
            key={item.productId}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-background">
              <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
            </div>

            <div className="flex-1">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted">৳{item.price?.toLocaleString()} each</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                aria-label="Decrease quantity"
                isDisabled={item.quantity <= 1}
                onPress={() => updateQuantity(item.productId, item.quantity - 1)}
              >
                −
              </Button>
              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                aria-label="Increase quantity"
                isDisabled={item.quantity >= item.stock}
                onPress={() => updateQuantity(item.productId, item.quantity + 1)}
              >
                +
              </Button>
            </div>

            <p className="w-24 text-right font-semibold text-foreground">
              ৳{(item.price * item.quantity).toLocaleString()}
            </p>

            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              aria-label="Remove item"
              onPress={() => removeFromCart(item.productId)}
            >
              <TrashBin width={16} height={16} className="text-danger" />
            </Button>
          </Surface>
        ))}
      </div>

      <Surface className="mt-6 rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Total Amount</span>
          <span className="text-xl font-bold text-foreground">
            ৳{totalAmount.toLocaleString()}
          </span>
        </div>

        <Button
          className="mt-4 w-full bg-accent text-accent-foreground"
          onPress={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </Surface>
    </div>
  );
}