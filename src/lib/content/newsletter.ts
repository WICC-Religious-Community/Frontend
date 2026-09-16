import { postContent } from "@/lib/content/client";
import type { NewsletterSubscription } from "@/lib/content/types";

export function subscribeToNewsletter(email: string): Promise<void> {
  return postContent<NewsletterSubscription, void>("/newsletter/subscribe", { email });
}
