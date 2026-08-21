"use client";

import { Surface, Button, AlertDialog } from "@heroui/react";
import { TrashBin, EnvelopeOpen } from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { markMessageRead, deleteMessage } from "@/lib/actions/contact";

export default function MessagesTable({ messages = [] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState(null);
  const [targetMessage, setTargetMessage] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const handleExpand = async (message) => {
    const isOpening = expandedId !== message._id;
    setExpandedId(isOpening ? message._id : null);

    if (isOpening && message.status !== "read") {
      const result = await markMessageRead(message._id);
      if (!result?.error) router.refresh();
    }
  };

  const confirmDelete = async () => {
    if (!targetMessage) return;
    setProcessingId(targetMessage._id);
    try {
      const result = await deleteMessage(targetMessage._id);
      if (result?.deletedCount > 0) {
        toast.success("Message deleted.");
        router.refresh();
      } else {
        toast.error("Failed to delete message.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setProcessingId(null);
      setTargetMessage(null);
    }
  };

  if (!messages.length) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted">No messages yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {messages.map((message) => {
          const isExpanded = expandedId === message._id;
          const isUnread = message.status !== "read";

          return (
            <Surface
              key={message._id}
              className={`rounded-2xl border p-4 transition-colors ${
                isUnread ? "border-accent bg-accent-soft/30" : "border-border bg-surface"
              }`}
            >
              <button
                onClick={() => handleExpand(message)}
                className="flex w-full items-start justify-between gap-3 text-left"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {isUnread && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                    )}
                    <p className="truncate font-medium text-foreground">
                      {message.subject}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {message.name} · {message.email}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted">
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })
                    : ""}
                </span>
              </button>

              {isExpanded && (
                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-sm text-foreground">{message.message}</p>
                  <div className="mt-3 flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      isIconOnly
                      aria-label="Delete message"
                      isDisabled={processingId === message._id}
                      onPress={() => setTargetMessage(message)}
                    >
                      <TrashBin width={16} height={16} className="text-danger" />
                    </Button>
                  </div>
                </div>
              )}
            </Surface>
          );
        })}
      </div>

      <AlertDialog.Root
        isOpen={!!targetMessage}
        onOpenChange={(open) => !open && setTargetMessage(null)}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Header>
                <AlertDialog.Heading>Delete this message?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                The message from <strong>{targetMessage?.name}</strong> will be
                permanently deleted.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <AlertDialog.CloseTrigger className="text-foreground">
                  Cancel
                </AlertDialog.CloseTrigger>
                <Button
                  className="bg-danger text-danger-foreground"
                  isDisabled={processingId === targetMessage?._id}
                  onPress={confirmDelete}
                >
                  {processingId === targetMessage?._id ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog.Root>
    </>
  );
}