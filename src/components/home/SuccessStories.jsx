import { Surface } from "@heroui/react";
import { StarFill } from "@gravity-ui/icons";

const stories = [
  {
    name: "Nusrat Jahan",
    role: "Seller",
    quote:
      "I sold my old laptop within three days of listing it. The whole process was straightforward, and I got a fair price without any hassle.",
  },
  {
    name: "Rakib Hasan",
    role: "Buyer",
    quote:
      "Found a study table in great condition for half the market price. The seller was responsive, and delivery was quick.",
  },
  {
    name: "Farhan Kabir",
    role: "Seller",
    quote:
      "ReSell Hub helped me clear out furniture I no longer needed while earning some extra money. I'll definitely use it again.",
  },
];

export default function SuccessStories() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">Success Stories</h2>
        <p className="mt-1 text-sm text-muted">
          What our buyers and sellers are saying
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stories.map((story) => (
            <Surface data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000"
              key={story.name}
              className="rounded-3xl border border-border bg-background p-5"
            >
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarFill key={i} width={14} height={14} />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted">&ldquo;{story.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-foreground">
                {story.name}
              </p>
              <p className="text-xs text-muted">{story.role}</p>
            </Surface>
          ))}
        </div>
      </div>
    </section>
  );
}