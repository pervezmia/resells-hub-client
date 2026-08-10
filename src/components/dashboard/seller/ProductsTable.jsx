"use client";

import { Table, Button, AlertDialog } from "@heroui/react";
import { Pencil, TrashBin, Eye } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { deleteProduct } from "@/lib/actions/product";

const statusStyles = {
  available: "bg-success-soft text-success",
  sold: "bg-danger-soft text-danger",
  pending: "bg-warning-soft text-warning",
};

export default function ProductsTable({ products = [] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [targetProduct, setTargetProduct] = useState(null); // যেই product delete করার জন্য confirm চাওয়া হচ্ছে

  const handleEdit = (id) => {
    router.push(`/dashboard/seller/my-products/${id}/edit`);
  };

  const confirmDelete = async () => {
    if (!targetProduct) return;
    const id = targetProduct._id;

    setDeletingId(id);
    try {
      const result = await deleteProduct(id);
      if (result?.deletedCount > 0) {
        toast.success("Product deleted successfully!");
        router.refresh();
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting the product.");
    } finally {
      setDeletingId(null);
      setTargetProduct(null);
    }
  };

  if (!products.length) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted">
          You haven't listed any products yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content aria-label="My products" className="min-w-[700px]">
            <Table.Header>
              <Table.Column isRowHeader>Product</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Stock</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {products.map((product) => (
                <Table.Row key={product._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-background">
                        <Image
                          src={product.images?.[0]}
                          alt={product.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-foreground">
                        {product.title}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell>৳{product.price?.toLocaleString()}</Table.Cell>
                  <Table.Cell>{product.stock ?? "—"}</Table.Cell>
                  <Table.Cell>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        statusStyles[product.status] || "bg-surface text-muted"
                      }`}
                    >
                      {product.status}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        isIconOnly
                        aria-label="View product"
                        onPress={() => router.push(`/products/${product._id}`)}
                      >
                        <Eye width={16} height={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        isIconOnly
                        aria-label="Edit product"
                        onPress={() => handleEdit(product._id)}
                      >
                        <Pencil width={16} height={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        isIconOnly
                        aria-label="Delete product"
                        isDisabled={deletingId === product._id}
                        onPress={() => setTargetProduct(product)}
                      >
                        <TrashBin width={16} height={16} className="text-danger" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <AlertDialog.Root
        isOpen={!!targetProduct}
        onOpenChange={(open) => !open && setTargetProduct(null)}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Header>
                <AlertDialog.Heading>Delete this product?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                This will permanently delete{" "}
                <strong>{targetProduct?.title}</strong>. This action cannot be
                undone.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <AlertDialog.CloseTrigger className="text-foreground">
                  Cancel
                </AlertDialog.CloseTrigger>
                <Button
                  className="bg-danger text-danger-foreground"
                  isDisabled={deletingId === targetProduct?._id}
                  onPress={confirmDelete}
                >
                  {deletingId === targetProduct?._id ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog.Root>
    </>
  );
}