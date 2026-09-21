"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@/lib/forms/use-form";
import { composeValidators, email as emailRule, required } from "@/lib/validation/rules";

export interface NewsletterFormProps {
  /** Left to the consumer so this component stays free of any particular backend or API shape. */
  onSubscribe: (email: string) => Promise<void>;
}

export function NewsletterForm({ onSubscribe }: NewsletterFormProps) {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm({
    initialValues: { email: "" },
    validators: {
      email: composeValidators(required("Enter your email address"), emailRule()),
    },
    onSubmit: async (values) => {
      setStatus("idle");
      setErrorMessage(null);
      try {
        await onSubscribe(values.email);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
      }
    },
  });

  if (status === "success") {
    return <p className="text-sm text-foreground">You&apos;re on the list — thanks for staying connected.</p>;
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="newsletter-email">Email address</Label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          value={form.values.email}
          onChange={form.handleChange("email")}
          onBlur={form.handleBlur("email")}
          aria-invalid={Boolean(form.touched.email && form.errors.email)}
          aria-describedby={form.errors.email ? "newsletter-email-error" : undefined}
        />
        {form.touched.email && form.errors.email ? (
          <p id="newsletter-email-error" className="text-sm text-destructive">
            {form.errors.email}
          </p>
        ) : null}
      </div>
      <Button type="submit" className="w-fit" disabled={form.isSubmitting} aria-busy={form.isSubmitting}>
        {form.isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
      {status === "error" && errorMessage ? (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
