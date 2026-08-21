import { getMarketplaceStats } from "@/lib/api/stats";
import { Surface } from "@heroui/react";
import { ArrowsRotateLeft, PlanetEarth, Persons } from "@gravity-ui/icons";

export const metadata = {
  title: "About Us | ReSell Hub",
  description: "Learn about ReSell Hub's mission to make buying and selling pre-owned products safe, easy, and sustainable.",
};

const values = [
  {
    icon: ArrowsRotateLeft,
    title: "Give Products a Second Life",
    description:
      "We believe the most sustainable product is the one that already exists. Every listing on ReSell Hub keeps a usable item in circulation instead of a landfill.",
  },
  {
    icon: Persons,
    title: "Built on Trust",
    description:
      "Verified accounts, transparent seller profiles, and an admin team that reviews listings help keep transactions safe for both buyers and sellers.",
  },
  {
    icon: PlanetEarth,
    title: "Community Over Consumption",
    description:
      "We're building more than a marketplace — we're building a community of people who'd rather reuse and share than throw away and replace.",
  },
];

const AboutPage = async () => {
  const stats = await getMarketplaceStats();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          About ReSell Hub
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          ReSell Hub is an online marketplace built to make buying and
          selling pre-owned products simple, safe, and worthwhile — for
          people, and for the planet.
        </p>
      </div>

      <Surface className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-xl font-bold text-foreground">Our Story</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Every household has items that still work perfectly well but no
          longer get used — a laptop replaced by a newer model, furniture
          left behind after a move, clothes that no longer fit. At the same
          time, plenty of people are looking for exactly those items at a
          price that makes sense. ReSell Hub exists to connect the two:
          sellers who want their unused belongings to find a new home, and
          buyers who'd rather spend less for something just as good.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          What started as a simple idea — reduce waste while helping people
          save and earn — has grown into a platform covering electronics,
          furniture, vehicles, fashion, and more, with tools for browsing,
          messaging through orders, secure checkout, and account management
          for buyers, sellers, and admins alike.
        </p>
      </Surface>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {values.map(({ icon: Icon, title, description }) => (
          <Surface
            key={title}
            className="rounded-3xl border border-border bg-surface p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <Icon width={22} height={22} />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted">{description}</p>
          </Surface>
        ))}
      </div>

      <Surface className="mt-8 rounded-3xl border border-border bg-surface p-6 text-center sm:p-8">
        <h2 className="text-lg font-semibold text-foreground">
          Growing Every Day
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.totalProducts}</p>
            <p className="text-xs text-muted">Products Listed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.totalSellers}</p>
            <p className="text-xs text-muted">Active Sellers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.totalBuyers}</p>
            <p className="text-xs text-muted">Registered Buyers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.completedOrders}</p>
            <p className="text-xs text-muted">Orders Completed</p>
          </div>
        </div>
      </Surface>
    </div>
  );
};

export default AboutPage;