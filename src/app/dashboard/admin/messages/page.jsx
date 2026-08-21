import { getAllMessages } from "@/lib/api/contact";
import MessagesTable from "@/components/dashboard/admin/MessagesTable";

export const metadata = {
  title: "Messages | ReSell Hub Admin Dashboard",
  description: "View and manage contact messages submitted by users.",
};

const AdminMessages = async () => {
  const messages = await getAllMessages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Messages</h1>
      <p className="mt-1 text-sm text-muted">
        {messages.length} message{messages.length === 1 ? "" : "s"} received via the Contact page.
      </p>

      <div className="mt-6">
        <MessagesTable messages={messages} />
      </div>
    </div>
  );
};

export default AdminMessages;