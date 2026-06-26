// Server-side only — never import into client components
import { supabaseAdmin } from "@/lib/supabase/admin";

// ────────────────────────────────────────────────────────────────
// Failed Event Queue Manager
//
// Saves failed CAPI events to DB for cron retry.
// Meta allows events up to 7 days late, so we give each event
// up to 7 days or 5 attempts before marking as permanently failed.
// ────────────────────────────────────────────────────────────────

const TABLE_NAME = "meta_event_queue";

/**
 * Save a failed CAPI event payload to the queue for retry.
 *
 * @param {object} payload - The full CAPI payload that failed to send
 * @returns {Promise<object|null>} The saved record or null on failure
 */
export async function saveToQueue(payload) {
  try {
    const eventName = payload.data?.[0]?.event_name || "unknown";
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .insert({
        event_name: eventName,
        payload: payload,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error(
        "[Meta Queue] Failed to save event to queue:",
        error.message,
      );
      return null;
    }

    console.log(
      `[Meta Queue] ✅ Event ${eventName} saved to queue (id: ${data.id})`,
    );
    return data;
  } catch (err) {
    console.error("[Meta Queue] Error saving to queue:", err.message);
    return null;
  }
}

/**
 * Get pending events from the queue for retry processing.
 *
 * @param {number} [limit=50] - Maximum number of events to fetch
 * @returns {Promise<Array>} Array of pending event records
 */
export async function getPendingEvents(limit = 50) {
  try {
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) {
      console.error(
        "[Meta Queue] Failed to fetch pending events:",
        error.message,
      );
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("[Meta Queue] Error fetching pending events:", err.message);
    return [];
  }
}

/**
 * Mark a queued event as successfully sent.
 *
 * @param {string} id - UUID of the queue record
 * @returns {Promise<boolean>} True if successful
 */
export async function markAsSent(id) {
  try {
    const { error } = await supabaseAdmin
      .from(TABLE_NAME)
      .update({ status: "sent" })
      .eq("id", id);

    if (error) {
      console.error(
        `[Meta Queue] Failed to mark event ${id} as sent:`,
        error.message,
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error(
      `[Meta Queue] Error marking event ${id} as sent:`,
      err.message,
    );
    return false;
  }
}

/**
 * Mark a queued event as permanently failed (beyond retry limits).
 *
 * @param {string} id - UUID of the queue record
 * @returns {Promise<boolean>} True if successful
 */
export async function markAsFailed(id) {
  try {
    const { error } = await supabaseAdmin
      .from(TABLE_NAME)
      .update({ status: "failed" })
      .eq("id", id);

    if (error) {
      console.error(
        `[Meta Queue] Failed to mark event ${id} as failed:`,
        error.message,
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error(
      `[Meta Queue] Error marking event ${id} as failed:`,
      err.message,
    );
    return false;
  }
}

/**
 * Increment the attempts counter and update last_attempted_at timestamp.
 *
 * @param {string} id - UUID of the queue record
 * @returns {Promise<boolean>} True if successful
 */
export async function incrementAttempts(id) {
  try {
    const { data: current, error: fetchError } = await supabaseAdmin
      .from(TABLE_NAME)
      .select("attempts")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      console.error(
        `[Meta Queue] Failed to fetch current attempts for ${id}:`,
        fetchError?.message,
      );
      return false;
    }

    const { error } = await supabaseAdmin
      .from(TABLE_NAME)
      .update({
        attempts: (current.attempts || 0) + 1,
        last_attempted_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(
        `[Meta Queue] Failed to increment attempts for ${id}:`,
        error.message,
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error(
      `[Meta Queue] Error incrementing attempts for ${id}:`,
      err.message,
    );
    return false;
  }
}
