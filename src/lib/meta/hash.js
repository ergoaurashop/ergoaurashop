import crypto from "crypto";

// ────────────────────────────────────────────────────────────────
// Core SHA256 hasher
// ────────────────────────────────────────────────────────────────

/**
 * Hash any value using SHA256.
 * @param {string|undefined|null} value
 * @returns {string|undefined} 64-char hex string, or undefined if input is null/undefined
 */
export function hashData(value) {
  if (value === null || value === undefined) return undefined;
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

// ────────────────────────────────────────────────────────────────
// India Phone Normalisation
// ────────────────────────────────────────────────────────────────

/**
 * Normalise an Indian phone number to a 10-digit string.
 *
 * Input formats handled:
 *   +91-9876543210  → 9876543210
 *   09876543210     → 9876543210
 *   919876543210    → 9876543210
 *   9876543210      → 9876543210
 *
 * @param {string|number|null|undefined} phone
 * @returns {string|null} 10-digit string or null if invalid
 */
export function normalisePhone(phone) {
  if (phone === null || phone === undefined) return null;
  let digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  if (digits.length !== 10) return null;
  return digits;
}

// ────────────────────────────────────────────────────────────────
// Pincode Normalisation
// ────────────────────────────────────────────────────────────────

/**
 * Normalise an Indian pincode to a 6-digit string.
 *
 * @param {string|number|null|undefined} pincode
 * @returns {string|null} 6-digit string or null if invalid
 */
export function normalisePincode(pincode) {
  if (pincode === null || pincode === undefined) return null;
  const digits = String(pincode).replace(/\D/g, "");
  if (digits.length !== 6) return null;
  return digits;
}

// ────────────────────────────────────────────────────────────────
// India State Map
// ────────────────────────────────────────────────────────────────

export const stateMap = {
  // Abbreviations → full names
  dl: "delhi",
  mh: "maharashtra",
  ka: "karnataka",
  tn: "tamil nadu",
  kl: "kerala",
  gj: "gujarat",
  up: "uttar pradesh",
  wb: "west bengal",
  rj: "rajasthan",
  mp: "madhya pradesh",
  hr: "haryana",
  pb: "punjab",
  br: "bihar",
  ts: "telangana",
  ap: "andhra pradesh",
  or: "odisha",
  jh: "jharkhand",
  uk: "uttarakhand",
  hp: "himachal pradesh",
  ga: "goa",
  as: "assam",
  mn: "manipur",
  ml: "meghalaya",
  mz: "mizoram",
  nl: "nagaland",
  sk: "sikkim",
  tr: "tripura",
  ar: "arunachal pradesh",
  ct: "chhattisgarh",
  // Common customer mis-spellings
  maharastra: "maharashtra",
  tamilnadu: "tamil nadu",
  bangaluru: "karnataka",
  bengaluru: "karnataka",
  bengalore: "karnataka",
  tamilnādu: "tamil nadu",
  uttarpradesh: "uttar pradesh",
  andhrapradesh: "andhra pradesh",
  madhyapradesh: "madhya pradesh",
  himachalpradesh: "himachal pradesh",
  jammukashmir: "jammu and kashmir",
  "j&k": "jammu and kashmir",
};

// ────────────────────────────────────────────────────────────────
// Public API — all hash functions
// ────────────────────────────────────────────────────────────────

/**
 * Hash an email address: lowercase → trim → SHA256.
 * @param {string|undefined|null} email
 * @returns {string|undefined}
 */
export function hashEmail(email) {
  if (!email) return undefined;
  return hashData(String(email).toLowerCase().trim());
}

/**
 * Hash a phone number: normalise to 10 digits → SHA256.
 * @param {string|number|undefined|null} phone
 * @returns {string|undefined}
 */
export function hashPhone(phone) {
  const normalised = normalisePhone(phone);
  if (!normalised) return undefined;
  return hashData(normalised);
}

/**
 * Hash a name: lowercase → trim → SHA256.
 * @param {string|undefined|null} name
 * @returns {string|undefined}
 */
export function hashName(name) {
  if (!name) return undefined;
  return hashData(String(name).toLowerCase().trim());
}

/**
 * Hash an external ID (customer ID, order ID, etc.): toString → trim → SHA256.
 * @param {string|number|undefined|null} id
 * @returns {string|undefined}
 */
export function hashExternalId(id) {
  if (id === null || id === undefined) return undefined;
  return hashData(String(id).trim());
}

/**
 * Hash a city name: lowercase → trim → SHA256.
 * @param {string|undefined|null} city
 * @returns {string|undefined}
 */
export function hashCity(city) {
  if (!city) return undefined;
  return hashData(String(city).toLowerCase().trim());
}

/**
 * Hash a state: normalise abbreviation/full name → lowercase → SHA256.
 * Falls back to hashing the raw input if not found in the state map.
 *
 * @param {string|undefined|null} state
 * @returns {string|undefined}
 */
export function hashState(state) {
  if (!state) return undefined;
  const key = String(state).toLowerCase().trim();
  const fullName = stateMap[key] || key;
  return hashData(fullName);
}

/**
 * Hash a pincode: strip spaces → must be 6 digits → SHA256.
 * @param {string|number|undefined|null} pincode
 * @returns {string|undefined}
 */
export function hashPincode(pincode) {
  const normalised = normalisePincode(pincode);
  if (!normalised) return undefined;
  return hashData(normalised);
}

/**
 * Hash the country "in" — always returns the SHA256 of "in".
 * @returns {string}
 */
export function hashCountry() {
  return hashData("in");
}
