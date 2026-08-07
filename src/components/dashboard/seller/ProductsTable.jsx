"use client";

import { Table, Icon, Button } from "@heroui/react";
import { Pencil, TrashBin, Eye } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const statusStyles = {
  available: "bg-success-soft text-success",
  sold: "bg-danger-soft text-danger",
  pending: "bg-warning-soft text-warning",
};

export default function ProductsTable({ products = [] }) {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/dashboard/seller/products/${id}/edit`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    // TODO: call deleteProduct server action here
    toast.success("Product deleted successfully!");
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
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
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
                      onPress={() => router.push(`/product/${product._id}`)}
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
                      onPress={() => handleDelete(product._id)}
                    >
                      <TrashBin
                        width={16}
                        height={16}
                        className="text-danger"
                      />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
