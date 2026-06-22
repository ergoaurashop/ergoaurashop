import { RESEND_FROM_EMAIL, RESEND_AUDIENCE_ID } from "@/lib/constants";
import { getResendClient } from "./client";

export type EmailSendResult =
  | { success: true; id: string }
  | { success: false; error: string };

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  /** Optional plain-text fallback (auto-generated from html if omitted) */
  text?: string;
  /** Optional Resend audience contact-list id for subscription management */
  audienceId?: string;
}

/**
 * Central email-send function.
 *
 * **Safety guarantee**: This function **never throws**. All errors are caught
 * and returned as `{ success: false, error }` so the caller can safely fire-
 * and-forget without try/catch.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  audienceId,
}: SendEmailParams): Promise<EmailSendResult> {
  try {
    const resend = getResendClient();

    const audience = audienceId ?? RESEND_AUDIENCE_ID;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error }: any = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(text ? { text } : {}),
      ...(audience ? { audience_id: audience } : {}),
    });

    if (error) {
      console.error("[sendEmail] Resend API error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id ?? "unknown" };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown email send failure";
    console.error("[sendEmail] Uncaught exception:", message);
    return { success: false, error: message };
  }
}
