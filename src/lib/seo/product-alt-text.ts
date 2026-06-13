// =====================================================================
// SEO Keyword-Rich Alt Text for Product Images
// Each product slug maps to an array of descriptive alt texts
// (one per image index). Image 0 is the primary/thumbnail.
// =====================================================================

/**
 * Maps product slugs to SEO-optimised alt text descriptions.
 * Each entry is an array where index matches the image index
 * in SLUG_TO_IMAGES (products-data.ts).
 */
const PRODUCT_ALT_TEXT: Record<string, string[]> = {
  "anti-snoring-chin-strap": [
    "Anti-snoring chin strap for better sleep — breathable jaw support belt worn on face for snore reduction",
    "Adjustable velcro strap on anti-snoring chin support — close-up view of secure fastening mechanism",
    "Side view of anti-snoring jaw support strap showing comfortable fit around face and ears",
    "Soft breathable stretch fabric texture of anti-snoring sleep aid — skin-friendly material close-up",
    "Anti-snoring chin strap on model demonstrating proper wearing position for nighttime snore relief",
    "Travel case with anti-snoring jaw support belt — portable sleep solution packing detail",
    "Lightweight anti-snoring chin strap weighing 50 grams — held in hand for size reference",
    "Video demonstration of anti-snoring chin strap application — step-by-step wearing guide",
  ],
  "blackhead-remover-vacuum-tool": [
    "Blackhead remover vacuum tool with LCD display — USB rechargeable pore cleaner for clear skin",
    "Five interchangeable suction heads for blackhead removal tool — different tips for various skin areas",
    "Blackhead vacuum tool in use on nose — gentle suction removing pore impurities safely",
    "LCD screen on blackhead remover showing suction level and battery status — electronic display detail",
    "USB charging cable connected to blackhead extraction tool — rechargeable cordless operation",
    "Blackhead remover vacuum with adjustable suction levels — settings control for sensitive to deep cleansing",
    "Silicone cleaning brush attachment for blackhead removal tool — gentle exfoliation accessory",
  ],
  "eye-massager-sleep-mask": [
    "Eye massager sleep mask with heat and vibration — rechargeable relaxation device for tired eyes",
    "Five massage modes on eye massager sleep mask — heat vibration compression and music settings shown",
    "Built-in Bluetooth speaker on eye massager — wireless music player integrated into sleep mask design",
    "Foldable eye massager for travel — lightweight sleep mask collapsing for easy storage",
    "USB-C charging port on eye massager sleep mask — rechargeable battery with 5 hour life",
    "Adjustable strap on eye massager — universal fit for all head sizes with comfortable PU leather padding",
    "Memory foam interior of eye massager sleep mask — soft cushioning for eye contour comfort",
    "Eye massager sleep mask worn on face demonstrating proper fit — heat therapy treatment in progress",
  ],
  "foot-massage-roller-spiked": [
    "Spiked foot massage roller for plantar fasciitis relief — acupressure roller for natural foot pain treatment",
    "Acupressure spikes on foot massage roller — close-up of stimulating nubs targeting pressure points",
    "Foot massage roller being used on bare foot — rolling motion for deep tissue massage therapy",
    "Non-slip texture on foot massage roller surface — durable ABS plastic construction detail",
    "Foot massage roller size comparison — 25 cm long portable roller held in hand",
    "Side view of spiked foot roller showing cylindrical shape and spike pattern distribution",
    "Foot massage roller on floor being used while sitting — home office foot care solution",
  ],
  "kitchen-sink-drain-hair-catcher": [
    "Kitchen sink drain hair catcher adhesive mesh roll — transparent clog prevention for sink drains",
    "Adhesive mesh drain protector being applied to kitchen sink — easy peel and stick installation",
    "Transparent drain hair catcher on sink surface — nearly invisible when applied for discreet protection",
    "Cut-to-size drain mesh roll measuring 300 cm long — custom fit for any sink shower or tub",
    "Close-up of adhesive mesh catching hair and debris — effective clog prevention demonstration",
    "Drain hair catcher mesh roll packaging — complete drain protection solution for kitchen and bathroom",
    "Water flowing freely through adhesive mesh drain cover — unobstructed drainage with full protection",
    "Drain mesh being trimmed with scissors — customizable sizing for different drain shapes",
    "Bathroom sink with adhesive mesh drain catcher installed — multi-purpose drain protection application",
  ],
  "magnetic-usb-cable-3-in-1": [
    "Magnetic USB cable 3-in-1 with interchangeable tips — universal charger for Apple Watch Micro USB and USB-C",
    "Magnetic USB cable tips — Apple Watch Micro USB and USB-C connectors for multi-device charging",
    "Magnetic auto-attach cable connector — close-up of magnet alignment for one-handed charging",
    "Braided nylon cable of 3-in-1 magnetic charger — durable tangle-resistant cord construction detail",
    "LED charging indicator on magnetic USB cable — blue light showing active charging status",
    "Three interchangeable magnetic tips lined up — complete set of charging adapters for all devices",
    "Hand holding magnetic USB cable — 1 meter length braided cable for portable charging",
    "USB-A input connector of magnetic charging cable — standard USB plug for power source connection",
  ],
  "menstrual-heating-pad-usb": [
    "USB menstrual heating pad for period pain relief — cordless rechargeable heat and massage for cramps",
    "Three heat level settings on menstrual heating pad — 35°C 45°C and 65°C temperature options",
    "Three vibration massage modes on period pain relief pad — different patterns for cramp soothing",
    "USB-C charging port on cordless menstrual heating pad — rechargeable battery pack detail",
    "Soft flexible fabric of menstrual heating pad — body-hugging polyester material wrapping comfortably",
    "Menstrual heating pad worn on abdomen — proper positioning for targeted period cramp relief",
    "Control button interface on heating pad — easy mode switching for heat and vibration settings",
    "2000 mAh battery pack of cordless heating pad — 6 hour battery life power source close-up",
  ],
  "posture-corrector-belt": [
    "Posture corrector belt for back pain relief — breathable neoprene back support for men and women",
    "Dual-strap design of posture corrector — adjustable shoulder straps pulling back for spine alignment",
    "Breathable neoprene material of back support belt — moisture-wicking fabric for all-day comfort wear",
    "Posture corrector belt worn under clothing — discreet back support invisible through shirt",
    "Adjustable chest strap on posture corrector — 30 to 50 inch fit range for universal sizing",
    "Side view of posture corrector belt — ergonomic design contouring to upper body shape",
    "Back view of posture corrector showing cross-strap design — spine alignment mechanism close-up",
  ],
  "silicone-oil-splatter-guard": [
    "Silicone oil splatter guard for frying — flexible mesh cover blocking oil splatters while cooking",
    "Fine silicone mesh of splatter guard — close-up of BPA-free food-grade material allowing steam escape",
    "Silicone splatter guard fitted on round pan — 16 to 30 cm diameter flexible design for all cookware",
    "Built-in weight ring on silicone mesh guard — stabilization ring keeping cover secure on pan",
    "Silicone oil splatter guard laid flat — full size view of heat-resistant kitchen accessory",
    "Red and grey colour options of silicone splatter guard — two-tone kitchen protective cover",
    "Splatter guard being washed — dishwasher safe silicone cleaning demonstration for easy maintenance",
    "Steam escaping through silicone mesh while frying — visible ventilation during active cooking use",
  ],
  "waterproof-phone-pouch": [
    "Waterproof phone pouch pack of 2 — IPX8 certified dry bag for underwater phone protection up to 30 meters",
    "Triple-lock waterproof seal on phone pouch — secure closure mechanism for complete water protection",
    "Phone inside clear waterproof pouch — touchscreen compatible transparent TPU material for full device use",
    "Detachable lanyard for waterproof phone pouch — hands-free neck strap for beach and travel carrying",
    "Two waterproof phone pouches in pack — set includes spare pouch for sharing or backup",
    "Waterproof pouch holding large phone — fits devices up to 7 inches even with protective case",
    "Phone pouch submerged in water demonstrating waterproof protection — IPX8 underwater test",
    "Carabiner attachment on waterproof pouch lanyard — secure clip for bag belt or backpack",
  ],
  "waterproof-shoe-covers": [
    "Waterproof shoe covers for rain protection — reusable anti-slip overshoes keeping feet dry in wet weather",
    "Anti-slip rubber sole on waterproof shoe cover — textured bottom for safe walking on slippery surfaces",
    "Elastic cuff and drawstring closure on rain shoe covers — secure ankle fit preventing water entry",
    "Waterproof shoe cover folded compactly — portable design fitting into included carry pouch for travel",
    "Carry pouch for waterproof overshoes — compact storage case for on-the-go rain protection",
    "One size fits most shoe covers — universal fit for EU 36-46 UK 3-11 adult shoe sizes",
    "Waterproof shoe cover worn on foot demonstrating full coverage — rain protection from shoe to ankle",
    "Video demonstration of waterproof shoe covers — rain protection testing and application guide",
  ],
};

/**
 * Returns SEO-optimised alt text for a product image.
 *
 * @param slug - Product slug (e.g. "anti-snoring-chin-strap")
 * @param productName - Fallback product name if slug not found in dictionary
 * @param imageIndex - Zero-based image index (0 = primary thumbnail)
 * @returns Descriptive alt text string for the image
 */
export function getProductImageAltText(
  slug: string,
  productName: string,
  imageIndex: number,
): string {
  const descriptions = PRODUCT_ALT_TEXT[slug];

  if (!descriptions || descriptions.length === 0) {
    // Fallback: descriptive default
    const position = imageIndex === 0 ? "" : ` - View ${imageIndex + 1}`;
    return `${productName} by ErgoAura${position}`;
  }

  // Clamp index to available descriptions
  const clampedIndex = Math.min(imageIndex, descriptions.length - 1);
  return descriptions[clampedIndex];
}
