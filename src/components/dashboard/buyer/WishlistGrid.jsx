"use client";

import { Surface, Button, AlertDialog } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { removeFromWishlist } from "@/lib/actions/wishlist";

export default function WishlistGrid({ items = [], buyerId }) {
  const router = useRouter();
  const [removingId, setRemovingId] = useState(null);
  const [targetItem, setTargetItem] = useState(null);

  const confirmRemove = async () => {
    if (!targetItem) return;
    setRemovingId(targetItem._id);
    try {
      const result = await removeFromWishlist(buyerId, targetItem.productId);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Removed from wishlist.");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setRemovingId(null);
      setTargetItem(null);
    }
  };

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted">
          You haven&apos;t saved any products yet. Browse{" "}
          <Link href="/products" className="text-accent underline">
            All Products
          </Link>{" "}
          to add some.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Surface
            key={item._id}
            className="overflow-hidden rounded-3xl border border-border bg-surface"
          >
            <Link href={`/products/${item.productId}`}>
              <div className="relative aspect-square w-full overflow-hidden bg-background">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/products/${item.productId}`}>
                <h3 className="line-clamp-1 font-semibold text-foreground">
                  {item.title}
                </h3>
              </Link>
              <p className="text-xs text-muted">{item.category}</p>
              <p className="mt-2 text-lg font-bold text-foreground">
                ৳{item.price?.toLocaleString()}
              </p>

              <Button
                variant="ghost"
                size="sm"
                className="mt-3 w-full"
                isDisabled={removingId === item._id}
                onPress={() => setTargetItem(item)}
              >
                <span className="flex items-center justify-center gap-1.5 text-danger">
                  <TrashBin width={14} height={14} />
                  Remove
                </span>
              </Button>
            </div>
          </Surface>
        ))}
      </div>

      <AlertDialog.Root
        isOpen={!!targetItem}
        onOpenChange={(open) => !open && setTargetItem(null)}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Header>
                <AlertDialog.Heading>Remove from wishlist?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <strong>{targetItem?.title}</strong> will be removed from your wishlist.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <AlertDialog.CloseTrigger className="text-foreground">
                  Cancel
                </AlertDialog.CloseTrigger>
                <Button
                  className="bg-danger text-danger-foreground"
                  isDisabled={removingId === targetItem?._id}
                  onPress={confirmRemove}
                >
                  {removingId === targetItem?._id ? "Removing..." : "Remove"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog.Root>
    </>
  );
}