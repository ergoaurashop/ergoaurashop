// ────────────────────────────────────────────────────────────────
// User Engagement Tracking  (scroll, clicks, forms, video, etc.)
// These do NOT use GA4 ecommerce schema — they push plain
// dataLayer events that GTM maps to GA4 Event tags.
// ────────────────────────────────────────────────────────────────

import { pushToDataLayer } from "./gtm";

// ── Constants that MUST match the GTM trigger names ──────────

export const ENGAGEMENT_EVENTS = {
  SCROLL_DEPTH: "scroll_depth",
  OUTBOUND_CLICK: "outbound_click",
  FORM_START: "form_start",
  FORM_SUBMIT: "form_submit",
  VIDEO_START: "video_start",
  VIDEO_PROGRESS: "video_progress",
  VIDEO_COMPLETE: "video_complete",
  ERROR_TRACK: "error_track",
  CLICK: "click",
} as const;

// ──────────────────────────────────────────────────────────────
// Scroll Depth
// Called by useScrollDepth hook; sends % value.
// ──────────────────────────────────────────────────────────────
export function trackScrollDepth(percent: number): void {
  pushToDataLayer({
    event: ENGAGEMENT_EVENTS.SCROLL_DEPTH,
    scroll_depth_percent: percent,
  });
}

// ──────────────────────────────────────────────────────────────
// Outbound Link Click  (external links)
// ──────────────────────────────────────────────────────────────
export function trackOutboundClick(
  url: string,
  linkText?: string,
  linkType: "cta" | "social" | "affiliate" | "external" = "external",
): void {
  pushToDataLayer({
    event: ENGAGEMENT_EVENTS.OUTBOUND_CLICK,
    outbound_url: url,
    link_text: linkText,
    link_type: linkType,
  });
}

// ──────────────────────────────────────────────────────────────
// Form Interaction
// ──────────────────────────────────────────────────────────────
export function trackFormStart(formName: string): void {
  pushToDataLayer({
    event: ENGAGEMENT_EVENTS.FORM_START,
    form_name: formName,
  });
}

export function trackFormSubmit(
  formName: string,
  success = true,
  errorMessage?: string,
): void {
  pushToDataLayer({
    event: ENGAGEMENT_EVENTS.FORM_SUBMIT,
    form_name: formName,
    success,
    ...(errorMessage && { error_message: errorMessage }),
  });
}

// ──────────────────────────────────────────────────────────────
// Video Engagement  (product videos, testimonials, etc.)
// ──────────────────────────────────────────────────────────────
export function trackVideoStart(videoTitle: string, videoUrl?: string): void {
  pushToDataLayer({
    event: ENGAGEMENT_EVENTS.VIDEO_START,
    video_title: videoTitle,
    video_url: videoUrl,
  });
}

export function trackVideoProgress(videoTitle: string, percent: number): void {
  pushToDataLayer({
    event: ENGAGEMENT_EVENTS.VIDEO_PROGRESS,
    video_title: videoTitle,
    video_progress_percent: percent,
  });
}

export function trackVideoComplete(videoTitle: string): void {
  pushToDataLayer({
    event: ENGAGEMENT_EVENTS.VIDEO_COMPLETE,
    video_title: videoTitle,
  });
}

// ──────────────────────────────────────────────────────────────
// Error Tracking  (client-side JS errors)
// ──────────────────────────────────────────────────────────────
export function trackError(
  errorType: string,
  errorMessage: string,
  source?: string,
): void {
  pushToDataLayer({
    event: ENGAGEMENT_EVENTS.ERROR_TRACK,
    error_type: errorType,
    error_message: errorMessage,
    ...(source && { error_source: source }),
  });
}

// ──────────────────────────────────────────────────────────────
// Generic Click Tracking
// ──────────────────────────────────────────────────────────────
export function trackClick(
  elementName: string,
  elementType: string,
  elementId?: string,
): void {
  pushToDataLayer({
    event: ENGAGEMENT_EVENTS.CLICK,
    element_name: elementName,
    element_type: elementType,
    element_id: elementId,
  });
}

// ──────────────────────────────────────────────────────────────
// Set user_id on dataLayer  (call after login / auth init)
// ──────────────────────────────────────────────────────────────
export function setUserId(userId: string): void {
  pushToDataLayer({ user_id: userId });
}

/** Clear user_id from dataLayer (on logout) */
export function clearUserId(): void {
  pushToDataLayer({ user_id: undefined });
}
