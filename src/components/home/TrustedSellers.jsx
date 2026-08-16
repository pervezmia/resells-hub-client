import { getAllUsers } from "@/lib/api/user";
import { getAllOrders } from "@/lib/api/order";
import { Surface, Avatar } from "@heroui/react";
import { ShieldCheck } from "@gravity-ui/icons";

export default async function TrustedSellers() {
  const [sellers, orders] = await Promise.all([
    getAllUsers("").then((users) => users.filter((u) => u.role === "seller")),
    getAllOrders(),
  ]);

  const deliveredOrders = orders.filter((o) => o.orderStatus === "delivered");

  const sellerStats = sellers.map((seller) => {
    const completed = deliveredOrders.filter(
      (o) => o.sellerInfo?.userId === seller._id
    ).length;
    return { ...seller, completed };
  });

  const topSellers = sellerStats
    .sort((a, b) => b.completed - a.completed)
    .slice(0, 4);

  if (!topSellers.some((s) => s.completed > 0)) return null;

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">Trusted Sellers</h2>
        <p className="mt-1 text-sm text-muted">
          Sellers with a strong track record of completed orders
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topSellers.map((seller) => (
            <Surface data-aos="zoom-in-right" 
              key={seller._id}
              className="flex flex-col items-center rounded-3xl border border-border bg-background p-6 text-center"
            >
              <Avatar size="lg">
                <Avatar.Image alt={seller.name} src={seller.image} />
                <Avatar.Fallback>{seller.name?.charAt(0)}</Avatar.Fallback>
              </Avatar>
              <p className="mt-3 font-semibold text-foreground">{seller.name}</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-success">
                <ShieldCheck width={14} height={14} />
                Verified Seller
              </div>
              <p className="mt-2 text-xs text-muted">
                {seller.completed} completed order{seller.completed === 1 ? "" : "s"}
              </p>
            </Surface>
          ))}
        </div>
      </div>
    </section>
  );
}