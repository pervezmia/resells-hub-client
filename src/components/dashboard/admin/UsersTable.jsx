"use client";

import { Table, Button, AlertDialog, Input, Select, ListBox } from "@heroui/react";
import { TrashBin, Magnifier, Xmark } from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { updateUserStatus, deleteUser } from "@/lib/actions/user";

const roleStyles = {
  buyer: "bg-primary-soft text-primary",
  seller: "bg-accent-soft text-accent",
  admin: "bg-warning-soft text-warning",
};

const roleFilterOptions = [
  { id: "", label: "All Roles" },
  { id: "buyer", label: "Buyer" },
  { id: "seller", label: "Seller" },
  { id: "admin", label: "Admin" },
];

export default function UsersTable({ users = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();
  const currentUserId = session?.user?.id;

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [updatingId, setUpdatingId] = useState(null);
  const [targetUser, setTargetUser] = useState(null);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRoleFilterChange = (key) => {
    updateParams({ role: key });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search });
  };

  const handleClearSearch = () => {
    setSearch("");
    updateParams({ search: "" });
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "blocked" ? "active" : "blocked";
    setUpdatingId(user._id);
    try {
      const result = await updateUserStatus(user._id, newStatus, currentUserId);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(newStatus === "blocked" ? "User blocked." : "User unblocked.");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!targetUser) return;
    setUpdatingId(targetUser._id);
    try {
      const result = await deleteUser(targetUser._id, currentUserId);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("User deleted.");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setUpdatingId(null);
      setTargetUser(null);
    }
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Select
          aria-label="Filter by role"
          placeholder="Filter"
          selectedKey={searchParams.get("role") || ""}
          onSelectionChange={handleRoleFilterChange}
          className="w-full md:w-56"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {roleFilterOptions.map((opt) => (
                <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
                  {opt.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <form onSubmit={handleSearchSubmit} className="w-full md:w-72">
          <div className="relative">
            <Magnifier
              width={16}
              height={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input
              aria-label="Search users by name or email"
              variant="secondary"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={search ? "pl-9 pr-20" : "pl-9 pr-12"}
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                isIconOnly
                aria-label="Clear search"
                className="absolute right-9 top-1/2 -translate-y-1/2"
                onPress={handleClearSearch}
              >
                <Xmark width={14} height={14} />
              </Button>
            )}
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              isIconOnly
              aria-label="Search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
            >
              <Magnifier width={16} height={16} />
            </Button>
          </div>
        </form>
      </div>

      {!users.length ? (
        <div className="rounded-3xl border border-border bg-surface p-10 text-center">
          <p className="text-sm text-muted">No users found.</p>
        </div>
      ) : (
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Manage users" className="min-w-[700px]">
              <Table.Header>
                <Table.Column isRowHeader>Name</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Role</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {users.map((user) => {
                  const isSelf = user._id === currentUserId;
                  return (
                    <Table.Row key={user._id}>
                      <Table.Cell>
                        <span className="font-medium text-foreground">
                          {user.name}
                          {isSelf && <span className="ml-2 text-xs text-muted">(You)</span>}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="text-sm text-muted">{user.email}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                            roleStyles[user.role] || "bg-surface text-muted"
                          }`}
                        >
                          {user.role || "buyer"}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                            user.status === "blocked"
                              ? "bg-danger-soft text-danger"
                              : "bg-success-soft text-success"
                          }`}
                        >
                          {user.status || "active"}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        {isSelf ? (
                          <span className="text-xs text-muted">—</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              isDisabled={updatingId === user._id}
                              onPress={() => handleToggleStatus(user)}
                            >
                              {user.status === "blocked" ? "Unblock" : "Block"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              isIconOnly
                              aria-label="Delete user"
                              isDisabled={updatingId === user._id}
                              onPress={() => setTargetUser(user)}
                            >
                              <TrashBin width={16} height={16} className="text-danger" />
                            </Button>
                          </div>
                        )}
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
        isOpen={!!targetUser}
        onOpenChange={(open) => !open && setTargetUser(null)}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Header>
                <AlertDialog.Heading>Delete this user?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <strong>{targetUser?.name}</strong> ({targetUser?.email}) will be
                permanently deleted. This cannot be undone.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <AlertDialog.CloseTrigger className="text-foreground">
                  Cancel
                </AlertDialog.CloseTrigger>
                <Button
                  className="bg-danger text-danger-foreground"
                  isDisabled={updatingId === targetUser?._id}
                  onPress={confirmDelete}
                >
                  {updatingId === targetUser?._id ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog.Root>
    </>
  );
}