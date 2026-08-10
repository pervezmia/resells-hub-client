"use client";

import { updateProduct } from "@/lib/actions/product";
import { PRODUCT_CATEGORIES, PRODUCT_CONDITIONS } from "@/lib/constants";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditProductForm({ product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setError("");

    const formData = new FormData(form);
    const raw = Object.fromEntries(formData.entries());

    const images = raw.images
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    const payload = {
      title: raw.title,
      category: raw.category,
      condition: raw.condition,
      price: Number(raw.price),
      stock: Number(raw.stock),
      images,
      description: raw.description,
    };

    try {
      const result = await updateProduct(product._id, payload);
      if (result?.modifiedCount > 0 || result?.matchedCount > 0) {
        toast.success("Product updated successfully!");
        router.push("/dashboard/seller/my-products");
        router.refresh();
      } else {
        setError("Failed to update product.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while updating the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>
      <p className="mt-1 text-sm text-muted">
        Update the details of your product listing.
      </p>

      <Surface className="mt-6 rounded-3xl border border-border bg-surface p-6">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Group className="gap-4">
              <TextField isRequired name="title" minLength={5} defaultValue={product.title}>
                <Label>Product Title</Label>
                <Input variant="secondary" />
                <Description>Be specific — brand, model, key spec</Description>
                <FieldError />
              </TextField>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select
                  isRequired
                  name="category"
                  placeholder="Select category"
                  defaultSelectedKey={product.category}
                >
                  <Label>Category</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <ListBox.Item key={cat} id={cat} textValue={cat}>
                          {cat}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <Select
                  isRequired
                  name="condition"
                  placeholder="Select condition"
                  defaultSelectedKey={product.condition}
                >
                  <Label>Condition</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {PRODUCT_CONDITIONS.map((c) => (
                        <ListBox.Item key={c} id={c} textValue={c}>
                          {c}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  isRequired
                  name="price"
                  type="number"
                  min={0}
                  defaultValue={String(product.price)}
                  validate={(value) => {
                    if (Number(value) <= 0) return "Price must be greater than 0";
                    return null;
                  }}
                >
                  <Label>Price (৳)</Label>
                  <Input variant="secondary" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="stock"
                  type="number"
                  min={1}
                  defaultValue={String(product.stock ?? 1)}
                >
                  <Label>Stock Quantity</Label>
                  <Input variant="secondary" />
                  <FieldError />
                </TextField>
              </div>

              <TextField isRequired name="images" defaultValue={product.images?.join(", ")}>
                <Label>Image URLs</Label>
                <Input variant="secondary" />
                <Description>Paste one or more image URLs, separated by commas</Description>
                <FieldError />
              </TextField>

              <TextField isRequired name="description" minLength={20} defaultValue={product.description}>
                <Label>Description</Label>
                <TextArea variant="secondary" rows={4} />
                <Description>Include specs, age, and any known issues</Description>
                <FieldError />
              </TextField>
            </Fieldset.Group>

            {error && (
              <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
                {error}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <Button
                type="submit"
                className="bg-accent text-accent-foreground"
                isDisabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onPress={() => router.push("/dashboard/seller/my-products")}
              >
                Cancel
              </Button>
            </div>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}