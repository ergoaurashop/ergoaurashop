import { RESEND_AUDIENCE_ID } from "@/lib/constants";
import { getResendClient } from "./client";

// =====================================================================
// Resend Audience Sync
// =====================================================================

export interface SyncContactParams {
  email: string;
  firstName?: string;
  lastName?: string;
  /** Arbitrary custom fields to store on the contact */
  customFields?: Record<string, string | number | boolean>;
}

/**
 * Sync a contact to the Resend audience (contact list).
 *
 * This creates the contact if they don't exist, or updates their data if
 * they do. It's safe to call on every order — Resend deduplicates by email.
 *
 * **Never throws** — errors are logged and swallowed.
 */
export async function syncContactToAudience(
  params: SyncContactParams,
): Promise<void> {
  if (!RESEND_AUDIENCE_ID) {
    console.warn(
      "[Audience] RESEND_AUDIENCE_ID not configured — skipping sync",
    );
    return;
  }

  try {
    const resend = getResendClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (resend.contacts as any).create({
      email: params.email,
      first_name: params.firstName,
      last_name: params.lastName,
      audience_id: RESEND_AUDIENCE_ID,
      ...(params.customFields ? { fields: params.customFields } : {}),
    });

    if (error) {
      console.error("[Audience] Failed to sync contact:", error.message);
      return;
    }

    console.log(`[Audience] Synced contact: ${params.email}`);
  } catch (err) {
    console.error(
      "[Audience] Error syncing contact:",
      err instanceof Error ? err.message : err,
    );
  }
}

/**
 * Remove a contact from the Resend audience (e.g., on unsubscribe).
 */
export async function removeContactFromAudience(email: string): Promise<void> {
  if (!RESEND_AUDIENCE_ID) {
    console.warn(
      "[Audience] RESEND_AUDIENCE_ID not configured — skipping removal",
    );
    return;
  }

  try {
    const resend = getResendClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (resend.contacts as any).remove({
      email,
      audience_id: RESEND_AUDIENCE_ID,
    });

    if (error) {
      console.error("[Audience] Failed to remove contact:", error.message);
      return;
    }

    console.log(`[Audience] Removed contact: ${email}`);
  } catch (err) {
    console.error(
      "[Audience] Error removing contact:",
      err instanceof Error ? err.message : err,
    );
  }
}
