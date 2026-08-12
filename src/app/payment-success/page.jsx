"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Surface, Button } from "@heroui/react";
import { CircleCheckFill } from "@gravity-ui/icons";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { authClient } from "@/lib/auth-client";
import { completeCheckout } from "@/lib/actions/checkout";
import { getPendingCheckout } from "@/lib/api/checkout";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const checkoutId = searchParams.get("checkout_id");
  const { clearCart } = useCart();
  const { data: session } = authClient.useSession();

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [orderInfo, setOrderInfo] = useState(null);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (!sessionId || processed) return;
    setProcessed(true);

    const process = async () => {
      try {
        const verifyRes = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
          setStatus("error");
          return;
        }

        const pending = await getPendingCheckout(checkoutId);

        if (!pending) {
          setStatus("error");
          return;
        }

        const result = await completeCheckout({
          buyerId: pending.buyerId,
          buyerName: pending.buyerName,
          buyerEmail: pending.buyerEmail,
          delivery: pending.delivery,
          cartItems: pending.cartItems,
          transactionId: verifyData.paymentIntentId,
          amount: pending.amount,
        });

        if (result?.error) {
          setStatus("error");
          return;
        }

        setOrderInfo({
          transactionId: verifyData.paymentIntentId,
          date: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          amount: pending.amount,
        });
        clearCart();
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    process();
  }, [sessionId, checkoutId, processed, clearCart]);

  if (status === "verifying") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-sm text-muted">Verifying your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <Surface className="rounded-3xl border border-border bg-surface p-8">
          <h1 className="text-xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-muted">
            We couldn&apos;t confirm your payment. If you were charged, please
            contact support.
          </p>
          <Button
            className="mt-6 bg-accent text-accent-foreground"
            onPress={() => router.push("/dashboard/buyer/cart")}
          >
            Back to Cart
          </Button>
        </Surface>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <Surface className="rounded-3xl border border-border bg-surface p-8">
        <CircleCheckFill width={48} height={48} className="mx-auto text-success" />
        <h1 className="mt-4 text-xl font-bold text-foreground">
          Payment Successful!
        </h1>
        <p className="mt-2 text-sm text-muted">
          Thank you for your purchase. Your order has been placed.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-background p-4 text-left text-sm">
          <div className="flex justify-between py-1">
            <span className="text-muted">Amount Paid</span>
            <span className="font-medium text-foreground">
              ৳{orderInfo?.amount?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted">Transaction ID</span>
            <span className="font-mono text-xs text-foreground">
              {orderInfo?.transactionId}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted">Date</span>
            <span className="font-medium text-foreground">{orderInfo?.date}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button
            className="bg-accent text-accent-foreground"
            onPress={() => router.push("/dashboard/buyer/orders")}
          >
            View My Orders
          </Button>
          <Link href="/products">
            <Button variant="secondary" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Surface>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <p className="text-sm text-muted">Loading...</p>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}