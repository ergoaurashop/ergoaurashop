"use server";

export interface AfterShipTracking {
  id: string;
  tracking_number: string;
  slug: string;
  status: string;
  tag: string;
  subtag: string;
  subtag_message: string;
  title: string;
  expected_delivery: string | null;
  shipment_package_count: number;
  shipment_type: string;
  shipment_weight: number | null;
  shipment_weight_unit: string;
  signed_by: string;
  source: string;
  tracked_count: number;
  unique_token: string;
  checkpoints: {
    slug: string;
    city: string | null;
    created_at: string;
    location: string | null;
    country_name: string | null;
    message: string;
    country_iso3: string | null;
    tag: string;
    subtag: string;
    subtag_message: string;
    checkpoint_time: string;
    coordinates: never[];
    state: string | null;
    zip: string | null;
  }[];
}

export async function getTrackingInfo(trackingNumber: string): Promise<AfterShipTracking | null> {
  const apiKey = process.env.AFTERSHIP_API_KEY;
  if (!apiKey) {
    console.error("[aftership] Missing AFTERSHIP_API_KEY");
    return null;
  }

  try {
    // Search for tracking by tracking_number keyword
    const response = await fetch(`https://api.aftership.com/v4/trackings?keyword=${encodeURIComponent(trackingNumber)}`, {
      method: "GET",
      headers: {
        "aftership-api-key": apiKey,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 }, // Always fetch fresh
    });

    if (!response.ok) {
      console.error("[aftership] Error fetching:", await response.text());
      return null;
    }

    const data = await response.json();
    
    // API returns a list of trackings matching the keyword, usually 1
    if (data.data?.trackings && data.data.trackings.length > 0) {
      return data.data.trackings[0] as AfterShipTracking;
    }

    return null;
  } catch (error) {
    console.error("[aftership] Fetch failed:", error);
    return null;
  }
}
