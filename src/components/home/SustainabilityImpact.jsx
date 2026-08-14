import { Surface } from "@heroui/react";
import { PlanetEarth, ArrowsRotateLeft, Wallet } from "@gravity-ui/icons";

const points = [
  {
    icon: ArrowsRotateLeft,
    title: "Reduce Waste",
    description:
      "Every pre-owned item sold on ReSell Hub is one less product heading to a landfill. Reusing extends a product's life and cuts down on manufacturing demand.",
  },
  {
    icon: PlanetEarth,
    title: "Lower Carbon Footprint",
    description:
      "Producing new goods consumes energy and raw materials. Buying second-hand means fewer resources spent, and a smaller environmental impact per purchase.",
  },
  {
    icon: Wallet,
    title: "Save Money, Earn Money",
    description:
      "Buyers find quality items at a fraction of retail price, while sellers turn unused belongings into extra income — good for wallets and the planet alike.",
  },
];

export default function SustainabilityImpact() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Sustainability Impact</h2>
        <p className="mx-auto mt-1 max-w-2xl text-sm text-muted">
          Second-hand buying isn&apos;t just budget-friendly — it&apos;s a small
          step toward a more sustainable way of consuming.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {points.map(({ icon: Icon, title, description }) => (
          <Surface
            key={title}
            className="rounded-3xl border border-border bg-surface p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success-soft text-success">
              <Icon width={22} height={22} />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted">{description}</p>
          </Surface>
        ))}
      </div>
    </section>
  );
}