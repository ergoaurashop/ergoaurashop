// ────────────────────────────────────────────────────────────────
// Meta CAPI Retry Handler
//
// Cron-triggered endpoint that processes failed CAPI events from
// the meta_event_queue table. Called by Vercel Cron every 15 min.
//
// Vercel Cron config (vercel.json):
//   { "path": "/api/meta-retry", "schedule": "*/15 * * * *" }
//
// CRITICAL: This route is idempotent — it can safely overlap runs.
// Each event has a max of 5 attempts or 7 days in queue.
// ────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import {
  getPendingEvents,
  markAsSent,
  markAsFailed,
  incrementAttempts,
} from "@/lib/meta/queue";
import { sendWithRetry } from "@/lib/meta/capi";

// ── Configuration ────────────────────────────────────────────────
const BATCH_SIZE = 50;
const MAX_ATTEMPTS = 5;
const MAX_AGE_DAYS = 7;
const MAX_AGE_MS = MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

/**
 * GET handler — callable by Vercel Cron Jobs.
 *
 * Accepts an optional `secret` query param for manual invocation.
 * In production, Vercel Cron calls this without authentication
 * since crons run in the protected environment.
 */
export async function GET(request) {
  return handleRetry(request);
}

/**
 * POST handler — alternative for cron systems that require POST.
 */
export async function POST(request) {
  return handleRetry(request);
}

/**
 * Core retry logic.
 *
 * 1. Fetch up to 50 pending events from the DB queue
 * 2. For each event, attempt to re-send via sendWithRetry()
 * 3. On success → mark as 'sent'
 * 4. On failure → increment attempts counter
 * 5. If attempts > 5 or event > 7 days old → mark as 'failed'
 */
async function handleRetry(request) {
  // ── Feature flag ──────────────────────────────────────────────
  if (process.env.META_RETRY_ENABLED !== "true") {
    return NextResponse.json(
      { error: "Meta retry handler is disabled (META_RETRY_ENABLED != true)" },
      { status: 503 },
    );
  }

  // ── Auth check for manual invocations ─────────────────────────
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET;

  if (secret && cronSecret && secret !== cronSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  console.log("[Meta Retry] ⏰ Starting retry cycle...");

  try {
    // 1. Fetch pending events
    const pendingEvents = await getPendingEvents(BATCH_SIZE);

    if (!pendingEvents || pendingEvents.length === 0) {
      console.log("[Meta Retry] ✅ No pending events to retry.");
      return NextResponse.json({
        processed: 0,
        succeeded: 0,
        failed: 0,
        message: "No pending events found",
      });
    }

    console.log(
      `[Meta Retry] 📋 Found ${pendingEvents.length} pending event(s) to retry.`,
    );

    let succeeded = 0;
    let failed = 0;
    const now = Date.now();

    // 2. Process each event
    for (const event of pendingEvents) {
      try {
        // 5. Check age — if event is too old, mark as failed
        const createdAt = new Date(event.created_at).getTime();
        if (now - createdAt > MAX_AGE_MS) {
          console.warn(
            `[Meta Retry] ⏰ Event ${event.id} is >${MAX_AGE_DAYS} days old. Marking as failed.`,
          );
          await markAsFailed(event.id);
          failed++;
          continue;
        }

        // 5. Check attempts — if exceeded, mark as failed
        if ((event.attempts || 0) >= MAX_ATTEMPTS) {
          console.warn(
            `[Meta Retry] ⏰ Event ${event.id} exceeded ${MAX_ATTEMPTS} attempts. Marking as failed.`,
          );
          await markAsFailed(event.id);
          failed++;
          continue;
        }

        // 2. Attempt to re-send
        const result = await sendWithRetry(event.payload, 3);

        if (result) {
          // 3. Success → mark as sent
          await markAsSent(event.id);
          succeeded++;
          console.log(`[Meta Retry] ✅ Event ${event.id} sent successfully.`);
        } else {
          // 4. Failure → increment attempts
          await incrementAttempts(event.id);
          failed++;
          console.warn(
            `[Meta Retry] ❌ Event ${event.id} failed to send. Attempts incremented.`,
          );
        }
      } catch (err) {
        console.error(
          `[Meta Retry] Error processing event ${event.id}:`,
          err.message,
        );
        failed++;
      }
    }

    console.log(
      `[Meta Retry] ✅ Cycle complete. Processed: ${pendingEvents.length}, Succeeded: ${succeeded}, Failed: ${failed}`,
    );

    return NextResponse.json({
      processed: pendingEvents.length,
      succeeded,
      failed,
    });
  } catch (err) {
    console.error("[Meta Retry] Fatal error in retry cycle:", err.message);
    return NextResponse.json(
      { error: "Internal server error during retry cycle" },
      { status: 500 },
    );
  }
}
