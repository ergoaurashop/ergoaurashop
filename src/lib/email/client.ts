import { Resend } from "resend";
import { RESEND_API_KEY } from "@/lib/constants";

let _client: Resend | null = null;

/**
 * Singleton Resend client.
 * Lazy-initialised so that it never blocks startup if env vars are misconfigured.
 */
export function getResendClient(): Resend {
  if (!_client) {
    _client = new Resend(RESEND_API_KEY);
  }
  return _client;
}

/**
 * Reset the cached client (useful only in tests).
 */
export function resetResendClient(): void {
  _client = null;
}
