import ContactForm from "@/components/contact/ContactForm";
import { Surface } from "@heroui/react";
import { Envelope, Smartphone, MapPin } from "@gravity-ui/icons";

export const metadata = {
  title: "Contact Us | ReSell Hub",
  description: "Get in touch with the ReSell Hub team for questions, feedback, or support.",
};

const contactDetails = [
  {
    icon: Envelope,
    label: "Email",
    value: "support@resellhub.com",
  },
  {
    icon: Smartphone,
    label: "Phone",
    value: "+880 1700-000000",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Dhaka, Bangladesh",
  },
];

const ContactPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Have a question about buying, selling, or your account? Send us a
          message and our team will get back to you.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <Surface
                key={label}
                className="flex items-center gap-4 rounded-3xl border border-border bg-surface p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon width={20} height={20} />
                </div>
                <div>
                  <p className="text-xs text-muted">{label}</p>
                  <p className="font-medium text-foreground">{value}</p>
                </div>
              </Surface>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <Surface className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm />
          </Surface>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;