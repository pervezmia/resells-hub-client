"use client";

import { Table, Button, AlertDialog, Select, ListBox } from "@heroui/react";
import { Check, Xmark, TrashBin } from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { updateProductApproval, deleteProduct } from "@/lib/actions/product";
import { getSafeImage } from "@/lib/utils";

const approvalStyles = {
  approved: "bg-success-soft text-success",
  pending: "bg-warning-soft text-warning",
  rejected: "bg-danger-soft text-danger",
};

const filterOptions = [
  { id: "", label: "All Products" },
  { id: "pending", label: "Pending Review" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

export default function ProductsTable({ products = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [updatingId, setUpdatingId] = useState(null);
  const [targetProduct, setTargetProduct] = useState(null);

  const handleFilterChange = (key) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key) params.set("approvalStatus", key);
    else params.delete("approvalStatus");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleApproval = async (id, approvalStatus) => {
    setUpdatingId(id);
    try {
      await updateProductApproval(id, approvalStatus);
      toast.success(
        approvalStatus === "approved" ? "Product approved." : "Product rejected."
      );
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!targetProduct) return;
    setUpdatingId(targetProduct._id);
    try {
      const result = await deleteProduct(targetProduct._id);
      if (result?.deletedCount > 0) {
        toast.success("Product deleted.");
        router.refresh();
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setUpdatingId(null);
      setTargetProduct(null);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Select
          aria-label="Filter by approval status"
          placeholder="Filter"
          selectedKey={searchParams.get("approvalStatus") || ""}
          onSelectionChange={handleFilterChange}
          className="w-56"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {filterOptions.map((opt) => (
                <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
                  {opt.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {!products.length ? (
        <div className="rounded-3xl border border-border bg-surface p-10 text-center">
          <p className="text-sm text-muted">No products found.</p>
        </div>
      ) : (
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Manage products" className="min-w-[750px]">
              <Table.Header>
                <Table.Column isRowHeader>Product</Table.Column>
                <Table.Column>Seller</Table.Column>
                <Table.Column>Price</Table.Column>
                <Table.Column>Approval</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {products.map((product) => {
                  const approvalStatus = product.approvalStatus || "approved";
                  const isUpdating = updatingId === product._id;

                  return (
                    <Table.Row key={product._id}>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-background">
                            <Image
                              src={getSafeImage(product.images?.[0])}
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
                      <Table.Cell className="text-sm text-muted">
                        {product.sellerInfo?.name || "—"}
                      </Table.Cell>
                      <Table.Cell>৳{product.price?.toLocaleString()}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                            approvalStyles[approvalStatus]
                          }`}
                        >
                          {approvalStatus}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          {approvalStatus !== "approved" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              isIconOnly
                              aria-label="Approve product"
                              isDisabled={isUpdating}
                              onPress={() => handleApproval(product._id, "approved")}
                            >
                              <Check width={16} height={16} className="text-success" />
                            </Button>
                          )}
                          {approvalStatus !== "rejected" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              isIconOnly
                              aria-label="Reject product"
                              isDisabled={isUpdating}
                              onPress={() => handleApproval(product._id, "rejected")}
                            >
                              <Xmark width={16} height={16} className="text-danger" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            isIconOnly
                            aria-label="Delete product"
                            isDisabled={isUpdating}
                            onPress={() => setTargetProduct(product)}
                          >
                            <TrashBin width={16} height={16} className="text-danger" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      )}

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
                <strong>{targetProduct?.title}</strong> will be permanently deleted.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <AlertDialog.CloseTrigger className="text-foreground">
                  Cancel
                </AlertDialog.CloseTrigger>
                <Button
                  className="bg-danger text-danger-foreground"
                  isDisabled={updatingId === targetProduct?._id}
                  onPress={confirmDelete}
                >
                  {updatingId === targetProduct?._id ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog.Root>
    </>
  );
}