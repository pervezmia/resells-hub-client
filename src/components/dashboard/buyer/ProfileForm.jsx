"use client";

import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  Button,
  Description,
  Fieldset,
  FieldError,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const image = formData.get("image");

    try {
      const { error: updateError } = await authClient.updateUser({
        name,
        image: image || undefined,
      });

      if (updateError) {
        setError(updateError.message || "Failed to update profile.");
      } else {
        toast.success("Profile updated successfully!");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Surface className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-center gap-4">
        <Avatar size="lg">
          <Avatar.Image alt={user?.name} src={user?.image} />
          <Avatar.Fallback delayMs={600}>
            {user?.name?.charAt(0)}
          </Avatar.Fallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground">{user?.name}</p>
          <p className="text-sm text-muted">{user?.email}</p>
        </div>
      </div>

      <Form onSubmit={onSubmit} className="mt-6">
        <Fieldset className="w-full">
          <Fieldset.Group className="gap-4">
            <TextField isRequired name="name" defaultValue={user?.name} minLength={2}>
              <Label>Full Name</Label>
              <Input placeholder="Md. Rakib Hasan" variant="secondary" />
              <FieldError />
            </TextField>

            <TextField name="image" defaultValue={user?.image}>
              <Label>Profile Image URL</Label>
              <Input placeholder="https://example.com/avatar.jpg" variant="secondary" />
              <Description>Paste a direct image URL</Description>
              <FieldError />
            </TextField>
          </Fieldset.Group>

          {error && (
            <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}

          <div className="mt-6">
            <Button
              type="submit"
              className="bg-accent text-accent-foreground"
              isDisabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Fieldset>
      </Form>
    </Surface>
  );
}