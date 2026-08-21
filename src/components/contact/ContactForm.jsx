"use client";

import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Button,
} from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendContactMessage } from "@/lib/actions/contact";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget; // ← আগেই ধরে রাখা হলো, event pool হওয়ার আগে

    setLoading(true);

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const result = await sendContactMessage(payload);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Message sent! We'll get back to you soon.");
      form.reset(); // ← এখন এটা safe, reference আগেই নেওয়া হয়েছে
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Fieldset className="w-full">
        <Fieldset.Group className="gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField isRequired name="name" minLength={2}>
              <Label>Your Name</Label>
              <Input placeholder="Md. Rakib Hasan" variant="secondary" />
              <FieldError />
            </TextField>

            <TextField isRequired type="email" name="email">
              <Label>Email</Label>
              <Input placeholder="you@example.com" variant="secondary" />
              <FieldError />
            </TextField>
          </div>

          <TextField isRequired name="subject" minLength={3}>
            <Label>Subject</Label>
            <Input placeholder="How can we help?" variant="secondary" />
            <FieldError />
          </TextField>

          <TextField isRequired name="message" minLength={10}>
            <Label>Message</Label>
            <TextArea
              placeholder="Tell us more about your question or feedback..."
              variant="secondary"
              rows={5}
            />
            <FieldError />
          </TextField>
        </Fieldset.Group>

        <div className="mt-6">
          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground sm:w-auto"
            isDisabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </Fieldset>
    </Form>
  );
}