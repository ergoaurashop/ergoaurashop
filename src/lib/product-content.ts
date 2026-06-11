// =====================================================================
// Product Rich Content
// Full rich content for each product page, sourced from
// plans/product-content/*.md markdown files.
// =====================================================================

import type { ProductRichContent } from "@/lib/types";

/**
 * Maps product slugs to their full rich content.
 * This data is used to enrich the product detail page with
 * conversion-optimized copy, FAQ, reviews, and more.
 */
export const PRODUCT_RICH_CONTENT: Record<string, ProductRichContent> = {
  // ===================================================================
  // Anti-Snoring Chin Strap
  // ===================================================================
  "anti-snoring-chin-strap": {
    pageTitle:
      "Stop snoring naturally — adjustable chin support strap, soft breathable, for men & women",
    tagline:
      "Finally, you and your partner can sleep peacefully — no more loud nights, just quiet, restful sleep starting tonight",
    benefits: [
      { icon: "ti ti-wind", label: "Soft & breathable" },
      { icon: "ti ti-adjustments", label: "Adjustable universal fit" },
      { icon: "ti ti-backpack", label: "Travel-friendly" },
      { icon: "ti ti-refresh", label: "7-day easy returns" },
    ],
    bulletBenefits: [
      "Gently supports your jaw to keep airways open while you sleep — most users see reduced snoring from the very first night",
      "Made from ultra-soft, breathable, skin-friendly stretch fabric — no irritation even after 8 hours of continuous nightly wear",
      "Slips on in 5 seconds with adjustable velcro straps — no batteries, no machines, no complicated setup or cleaning required",
      "Costs less than one doctor visit — replaces expensive sprays, nasal strips, and mouth guards, saving ₹5,000+ per year",
      "7-day no-questions return — if your sleep doesn't improve, we pick it up from your door free and refund every rupee",
    ],
    painPoints: [
      "Loud snoring that keeps your partner awake every single night",
      "Wake up with a dry, sore throat and feel exhausted all day",
      "Nothing you've tried — sprays, strips, pillows — has worked",
    ],
    solutionPoints: [
      "Quiet, undisturbed sleep for both you and your partner",
      "Wake up refreshed with natural nasal breathing all night long",
      "Gentle, drug-free support that works naturally while you sleep",
    ],
    problemHook:
      "You lie down tired, but sleep doesn't come easy. Within minutes, the snoring starts — loud, relentless, keeping your partner awake. They nudge you. You shift positions. It starts again. You wake up groggy with a dry throat, and they wake up frustrated. Snoring isn't just noise — it steals rest from both of you.",
    solutionBody:
      "This soft chin support strap works with your body's natural sleep position. It gently cradles your jaw, keeping your mouth closed and your airway open throughout the night. No bulky devices, no sticky strips, no harsh chemicals. Just a breathable fabric strap that helps you breathe through your nose — the way your body is designed to sleep. Your partner gets peace. You get real rest.",
    whatsInTheBox: {
      Included: "1× Anti-snoring chin strap",
      Material: "Soft, breathable stretch fabric",
      Size: "One size fits most adults (adjustable)",
      Weight: "50 g — lightweight, zero pressure",
      Care: "Hand wash with mild soap, air dry",
      Colour: "Black / Dark grey",
    },
    perfectFor: [
      {
        audience: "Couples",
        reason:
          "where one partner's snoring affects both people's sleep quality every night",
      },
      {
        audience: "Side & back sleepers",
        reason: "who wake up with dry mouth and throat every morning",
      },
      {
        audience: "Anyone tired of failed solutions",
        reason: "who've tried strips, sprays, and pillows with zero results",
      },
      {
        audience: "Perfect gift",
        reason:
          "for your spouse, parent, or roommate who deserves better sleep",
      },
    ],
    faqs: [
      {
        question: "Will it feel uncomfortable while sleeping?",
        answer:
          "Not at all — the ultra-soft breathable fabric feels light against your skin. Most users forget they're wearing it after the first few minutes of adjustment.",
      },
      {
        question: "How do I clean and maintain it?",
        answer:
          "Hand wash with mild soap and warm water, then air dry. Avoid machine washing to maintain the elasticity and shape of the fabric.",
      },
      {
        question: "What if it doesn't fit my face size?",
        answer:
          "The adjustable straps accommodate most adult face shapes. If it doesn't work for you, we offer a full 7-day no-questions refund.",
      },
    ],
    reviews: [
      {
        name: "Anjali M.",
        city: "Pune",
        rating: 5,
        text: "My husband's snoring was driving me insane. First night with this strap and I actually slept through without waking up. He says it's comfortable too. Already ordered one for my father.",
      },
      {
        name: "Vikram R.",
        city: "Bangalore",
        rating: 5,
        text: "I've tried nasal sprays, strips, and even that expensive mouth guard from the pharmacy. This simple ₹99 strap works better than all of them combined. Absolute steal.",
      },
      {
        name: "Neha K.",
        city: "Delhi",
        rating: 4,
        text: "Took me two nights to get used to the feel, but by night three I couldn't imagine sleeping without it. My fitness band sleep score went from 65 to 82. Worth every rupee.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Blackhead Remover Vacuum Tool
  // ===================================================================
  "blackhead-remover-vacuum-tool": {
    pageTitle:
      "Clear blackheads safely — vacuum pore cleaner, 5 suction heads, USB rechargeable",
    tagline:
      "Finally, clear pores without painful squeezing — gentle suction removes blackheads in minutes, not hours",
    benefits: [
      { icon: "ti ti-sparkles", label: "Deep pore cleaning" },
      { icon: "ti ti-components", label: "5 suction heads" },
      { icon: "ti ti-chart-3", label: "3 adjustable levels" },
      { icon: "ti ti-battery-charging", label: "USB rechargeable" },
    ],
    bulletBenefits: [
      "Gentle micro-suction removes blackheads, whiteheads, and clogged pores without painful squeezing or damaging your skin's surface",
      "Medical-grade plastic body with 5 interchangeable heads for different skin types — sensitive, dry, oily, or combination skin",
      "One-button operation with LED display — choose from 3 suction levels, glide over your face, and watch pores clear instantly",
      "Skip expensive salon facials — one ₹199 device replaces monthly ₹1,000+ professional extraction sessions, saving ₹10,000+ per year",
      "7-day no-questions return — if it doesn't remove blackheads effectively or causes any irritation, we pick it up free and refund you",
    ],
    painPoints: [
      "Stubborn blackheads that won't go away no matter how much you wash your face",
      "Painful squeezing that damages skin, leaves red marks, and spreads bacteria",
      "Expensive salon visits every month that eat into your budget",
    ],
    solutionPoints: [
      "Gentle suction lifts impurities from deep within pores — satisfying results you can see on the tool tip",
      "No pain, no red marks, no damaged skin — just clear, smooth pores after each use",
      "Professional-level results at home for a fraction of the cost",
    ],
    problemHook:
      "You wash your face twice a day, use the serums, follow the routine — but those blackheads on your nose and chin won't budge. The harder you squeeze, the worse they get — red marks, inflamed pores, and sometimes even scars. Salon facials work, but at ₹1,000+ per session, they're a luxury you can't afford every month. There has to be a better way.",
    solutionBody:
      "This vacuum blackhead remover uses gentle suction to extract impurities from deep within your pores — no squeezing, no pain, no damage. With 5 different suction heads to choose from, you can target different areas of your face: the wide head for your forehead and cheeks, the precision tip for your nose and chin. Three adjustable suction levels let you control the intensity for your skin type. The LED display shows your current level, and the USB rechargeable battery means you never need to buy batteries. After each use, just rinse the heads under the tap — the collected impurities wash away instantly.",
    whatsInTheBox: {
      Included:
        "1× Blackhead remover device · 5× Interchangeable suction heads · 1× USB charging cable",
      Material: "Medical-grade ABS plastic",
      "Suction levels": "3 adjustable modes (low / medium / high)",
      Power: "USB rechargeable (built-in battery)",
      Display: "LED level indicator",
      Weight: "160 g — lightweight, ergonomic grip",
      Colour: "White",
      "Skin types": "Sensitive, dry, oily, normal, combination",
      "Country of origin": "India",
    },
    perfectFor: [
      {
        audience: "Anyone with clogged pores",
        reason:
          "blackheads on the nose, chin, and forehead that won't clear with regular washing",
      },
      {
        audience: "Acne-prone skin",
        reason:
          "gentle extraction without spreading bacteria or causing breakouts",
      },
      {
        audience: "Salon facial fans",
        reason:
          "who want professional-level results at home between appointments",
      },
      {
        audience: "Perfect teen skincare gift",
        reason:
          "for college-going kids dealing with oily skin and clogged pores",
      },
    ],
    faqs: [
      {
        question: "Will this hurt or damage my skin?",
        answer:
          "Not at all — the gentle suction is comfortable on skin. Start with the lowest level for sensitive areas and increase gradually as your skin adjusts.",
      },
      {
        question: "How often should I use it?",
        answer:
          "1-2 times per week is ideal. Using it too frequently may irritate skin. Always moisturise after use and clean the heads before storing.",
      },
      {
        question: "Does it work on all skin types?",
        answer:
          "Yes — with 5 different suction heads and 3 adjustable levels, you can customise the experience for sensitive, dry, oily, or combination skin.",
      },
    ],
    reviews: [
      {
        name: "Maya S.",
        city: "Delhi",
        rating: 5,
        text: "I've tried every blackhead removal product on the market — strips, masks, scrubs. Nothing worked like this. The suction actually pulls everything out. My nose has never been this smooth.",
      },
      {
        name: "Rohit K.",
        city: "Ahmedabad",
        rating: 5,
        text: "I was sceptical at first, but the results after the first use were incredible. You can see the gunk collected in the tool — gross but satisfying. My pores look so much smaller now.",
      },
      {
        name: "Neha G.",
        city: "Mumbai",
        rating: 4,
        text: "Great device for the price. The 3 suction levels let me adjust for different areas of my face. Started with low and worked up to medium. Skin feels cleaner after every use.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Eye Massager Sleep Mask
  // ===================================================================
  "eye-massager-sleep-mask": {
    pageTitle:
      "Relieve tired eyes — eye massager with heat & Bluetooth music, 5 modes, foldable",
    tagline:
      "Put on the mask, feel the warmth, and let the music carry you — your eyes have never felt this refreshed",
    benefits: [
      { icon: "ti ti-player-play", label: "Bluetooth music" },
      { icon: "ti ti-temperature", label: "Heat therapy 42-45°C" },
      { icon: "ti ti-wind", label: "Air pressure + vibration" },
      { icon: "ti ti-fold", label: "180° foldable design" },
    ],
    bulletBenefits: [
      "5 massage modes combining air pressure, vibration, and heat — targets eye fatigue, dryness, headaches, and puffiness in one device",
      "Premium ABS body with soft inner padding — gentle around the delicate eye area, no direct pressure on the eyeball",
      "One-button control with built-in Bluetooth speaker — play soothing music from your phone while the massage works automatically",
      "One ₹799 device replaces endless eye drops, migraine pills, and spa eye treatments — saves ₹5,000+ per year on eye care",
      "7-day no-questions return — if the massage feels uncomfortable or doesn't relieve eye strain, we pick it up free and refund you fully",
    ],
    painPoints: [
      "Hours of screen time leaves your eyes dry, strained, and burning by evening",
      "Tension headaches build up behind your eyes from constant focus and blue light",
      "No way to truly relax your eye muscles — closing your eyes isn't the same as massaging them",
    ],
    solutionPoints: [
      "Warm compression soothes dry eyes while air pressure gently massages around the sockets",
      "Built-in Bluetooth music helps you relax while the 5 modes target different types of eye fatigue",
      "Fold it flat, take it anywhere — use it at home, in the office, or while travelling",
    ],
    problemHook:
      "You've been staring at screens all day — laptop at work, phone on the commute, laptop again at night. By evening, your eyes feel dry, heavy, and strained. The area around them aches. A tension headache is building behind your temples. You close your eyes, but the strain doesn't go away. You've tried eye drops, warm compresses with towels, even taking breaks — nothing gives lasting relief.",
    solutionBody:
      "This eye massager combines three therapeutic techniques — heat, air pressure, and vibration — to give your eyes the deep relaxation they need. The built-in heating element warms to a soothing 42-45°C, improving blood circulation around your eyes and relieving dryness. Soft air bags inflate and deflate in sequence, gently pressing on acupressure points around your sockets. Dual vibration motors target your temples to release tension headaches. Meanwhile, the built-in Bluetooth speaker lets you play calming music or a sleep meditation through the mask itself. Choose from 5 different massage modes, fold it flat for travel, and recharge via USB for cordless use anywhere.",
    whatsInTheBox: {
      Included: "1× Eye massager sleep mask · 1× USB charging cable",
      "Massage modes": "5 modes (heat, air pressure, vibration, combinations)",
      "Heat therapy": "42°C to 45°C hot compress",
      Music: "Built-in Bluetooth speaker",
      Vibration: "Dual motors — eye area + temple targeting",
      Material: "Premium ABS + soft padded interior",
      Weight: "214 g",
      Battery: "Rechargeable (built-in, USB powered)",
      Foldable: "180° fold — compact for travel",
      Colour: "White",
      Dimensions: "20 × 9.3 × 2.2 cm",
    },
    perfectFor: [
      {
        audience: "Screen professionals",
        reason:
          "developers, designers, writers, data analysts who stare at monitors 8+ hours daily",
      },
      {
        audience: "Contact lens wearers",
        reason:
          "whose eyes feel drier and more irritated after long wear hours",
      },
      {
        audience: "People with sleep issues",
        reason:
          "the combination of heat, massage, and music helps calm the mind before bed",
      },
      {
        audience: "Perfect self-care gift",
        reason:
          "for a spouse, parent, or friend who deserves to unwind after long days",
      },
    ],
    faqs: [
      {
        question: "Can I use it while lying down or only sitting?",
        answer:
          "Both. The ergonomic design and adjustable strap keep it comfortable in any position. It's especially soothing while lying in bed before sleep.",
      },
      {
        question: "Does the Bluetooth music work with any phone?",
        answer:
          "Yes — pair it with any smartphone, tablet, or device that supports Bluetooth audio. You can play sleep music, guided meditations, or audiobooks.",
      },
      {
        question: "Is it safe for people with glasses or contact lenses?",
        answer:
          "Remove contact lenses before use. Glasses wearers should remove glasses first. The massage area comfortably fits most face shapes and sizes.",
      },
    ],
    reviews: [
      {
        name: "Divya R.",
        city: "Bangalore",
        rating: 5,
        text: "I'm a software developer — 10 hours of screen time daily. This mask has been a game changer. The heat setting is perfect, the music feature is a bonus, and I wake up with zero eye strain.",
      },
      {
        name: "Kartik S.",
        city: "Mumbai",
        rating: 5,
        text: "My wife bought this for me because I get tension headaches from work. The temple vibration mode is incredible — it releases the pressure within 15 minutes. I use it every single night now.",
      },
      {
        name: "Sneha P.",
        city: "Delhi",
        rating: 4,
        text: "Great quality and the Bluetooth connectivity works smoothly. The 5 modes give good variety. I use the heat + music mode for sleep and the vibration mode for mid-day headaches. Worth every rupee.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Foot Massage Roller (Spiked)
  // ===================================================================
  "foot-massage-roller-spiked": {
    pageTitle:
      "Relax tired feet instantly — spiked acupressure roller for heel pain, plantar fasciitis relief",
    tagline:
      "After a long day, your feet deserve this — roll away the pain, release the tension, feel the pressure points melt",
    benefits: [
      { icon: "ti ti-massage", label: "Acupressure massage" },
      { icon: "ti ti-heart-pulse", label: "Improves blood flow" },
      { icon: "ti ti-grip-vertical", label: "Anti-slip base" },
      { icon: "ti ti-backpack", label: "Portable & compact" },
    ],
    bulletBenefits: [
      "12 acupressure rollers stimulate pressure points on both feet simultaneously — relieves heel pain, arch tension, and foot fatigue",
      "Premium ABS plastic with textured acupressure surface — durable, non-toxic, and strong enough to support full body weight standing",
      "Just place on the floor and roll your feet back and forth — no batteries, no electricity, no setup, use it while watching TV",
      "One ₹269 device replaces expensive monthly spa pedicures and reflexology sessions — saves ₹6,000+ per year on foot care",
      "7-day no-questions return — if it doesn't relieve your foot pain or feels uncomfortable, we pick it up free and refund you fully",
    ],
    painPoints: [
      "Feet ache after every long day at work — standing, walking, or running errands",
      "Heel pain that makes the first few steps in the morning unbearable",
      "Expensive spa massages that you can only afford once a month",
    ],
    solutionPoints: [
      "Roll for 5 minutes and feel the tension release — instant relief for tired feet",
      "Acupressure points target heel, arch, and ball of foot for complete relaxation",
      "Use daily at home, in the office, or at the gym — zero ongoing cost",
    ],
    problemHook:
      "You've been on your feet all day — at work, running errands, cooking, standing in queues. By evening, your heels throb, your arches ache, and the first few steps in the morning feel like walking on glass. A spa massage would be heavenly, but who has the time or ₹1,000+ every week? The pain builds up, and nothing at home seems to help.",
    solutionBody:
      "This dual-foot massage roller brings professional acupressure relief to your home. The 12 textured rollers target every pressure point on the soles of your feet — from heel to toe — stimulating blood circulation and releasing deep muscle tension. Just place it on the floor, stand or sit, and roll your feet back and forth. The spiked surface digs into those tight spots, the ridges massage your arches, and the smooth rolling motion soothes your heels. The anti-slip base keeps it stable, so you can use it at your desk, in front of the TV, or even in the kitchen while cooking.",
    whatsInTheBox: {
      Included: "1× Dual-foot massage roller board",
      Rollers: "12 acupressure wheels",
      Material: "Premium ABS plastic",
      Dimensions: "27 cm × 14 cm × 3 cm",
      Weight: "280 g",
      Colour: "Multicolour",
      Base: "Anti-slip rubber grip",
      Use: "Both feet simultaneously",
      "Country of origin": "India",
    },
    perfectFor: [
      {
        audience: "Office workers and desk employees",
        reason: "who stand or sit for 8+ hours with poor foot circulation",
      },
      {
        audience: "People with heel pain or plantar fasciitis",
        reason: "daily rolling reduces morning foot pain significantly",
      },
      {
        audience: "Fitness enthusiasts and runners",
        reason: "post-workout foot recovery without expensive massage tools",
      },
      {
        audience: "Elderly parents at home",
        reason:
          "gentle foot massage improves circulation and reduces stiffness without effort",
      },
    ],
    faqs: [
      {
        question: "Does the spiked surface hurt?",
        answer:
          "It may feel intense at first, but the sensation is therapeutic — like a deep tissue massage. Start with gentle pressure and increase as your feet get used to it.",
      },
      {
        question: "Can I use it while sitting or do I need to stand?",
        answer:
          "Both work. Sitting gives a gentler massage. Standing with full body weight provides deeper pressure for tougher knots and heel pain relief.",
      },
      {
        question: "Is it safe for elderly people with sensitive feet?",
        answer:
          "Yes — start with light pressure while sitting. The acupressure stimulation improves blood circulation, which is especially beneficial for seniors.",
      },
    ],
    reviews: [
      {
        name: "Ananya B.",
        city: "Bangalore",
        rating: 5,
        text: "I'm on my feet 10 hours a day at a retail job. This roller has been a lifesaver. Five minutes when I get home and the difference is incredible. My arches don't ache anymore.",
      },
      {
        name: "Vinod M.",
        city: "Pune",
        rating: 5,
        text: "My plantar fasciitis was killing me every morning. The physio recommended foot rolling. This ₹269 device works as well as the ₹2,000 massage roller at the clinic. Highly recommend.",
      },
      {
        name: "Kavita L.",
        city: "Hyderabad",
        rating: 4,
        text: "Bought this for my mother who has foot pain from diabetes. She uses it every evening while watching TV. Says her feet feel lighter and the numbness has reduced. Good purchase.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Kitchen Sink Drain Hair Catcher
  // ===================================================================
  "kitchen-sink-drain-hair-catcher": {
    pageTitle:
      "Stop drain clogs — adhesive mesh roll for sinks, cuttable, lasts up to 6 weeks",
    tagline:
      "No more plumbing bills or nasty drain cleaning — one roll covers every sink in your home for months",
    benefits: [
      { icon: "ti ti-scissors", label: "Cuttable to any size" },
      { icon: "ti ti-droplet", label: "Water drains freely" },
      { icon: "ti ti-home", label: "Use in every sink" },
      { icon: "ti ti-refresh", label: "Lasts 4-6 weeks each" },
    ],
    bulletBenefits: [
      "Catches every strand of hair and food debris before it enters your drain — zero clogs, zero blocked pipes, zero plumbing calls",
      "Strong waterproof adhesive with fine mesh holes — stays stuck for weeks while letting water flow through freely and fast",
      "Cut any size you need, peel, and stick — no tools, no plumber, no messy drain cleaning liquids needed",
      "One ₹189 roll replaces 4-6 months of drain cleaners and plumber visits — saves ₹2,500+ per year in maintenance",
      "7-day no-questions return — if the mesh doesn't stay stuck or catch debris, we pick it up free and refund you fully",
    ],
    painPoints: [
      "Hair and food scraps slowly build up in your pipes — then one day the drain is completely blocked",
      "Toxic drain cleaners that smell bad and damage your pipes over time",
      "Expensive plumber calls every few months for something that could have been prevented",
    ],
    solutionPoints: [
      "Every hair and scrap gets caught on the mesh before it reaches the drain — pipes stay clear forever",
      "No chemicals, no smell, no mess — just peel off the used sheet and stick a fresh one",
      "A ₹189 roll prevents thousands in potential plumbing damage",
    ],
    problemHook:
      "The water in the sink is rising instead of draining. Again. You reach for that bottle of chemical drain cleaner, hoping this time it works — but the smell is awful, and you know it's corroding your pipes. Or you call the plumber for the third time this year. Hair, soap scum, food scraps — they all end up in the same place: your drain pipe, slowly building into a costly blockage.",
    solutionBody:
      "This self-adhesive mesh roll is the simplest drain protection you'll ever use. Cut a piece to match your drain size, peel off the backing, and stick it down. That's it. The ultra-fine mesh catches every strand of hair and every food particle before they can enter your drain — while water flows through freely. A single piece lasts 4-6 weeks. When it's time to replace it, just peel it off and stick a new one. No tools. No chemicals. No plumber.",
    whatsInTheBox: {
      Included: "1× Adhesive mesh roll · 1× Tweezers · 1× Scraper tool",
      Dimensions: "12 cm wide × 4 metres long",
      Material: "Fine PVC mesh with waterproof adhesive backing",
      Colour: "Grey",
      "Lifespan per piece": "4-6 weeks (depending on usage)",
      Surface: "Works on metal, ceramic, plastic, and stone sink drains",
      Cleanup: "Peel off, discard — no scrubbing required",
    },
    perfectFor: [
      {
        audience: "Every home kitchen",
        reason:
          "food scraps and oil residue cause kitchen sink clogs faster than any other drain",
      },
      {
        audience: "Long-haired households",
        reason:
          "more hair in the shower drain means more frequent blockages without protection",
      },
      {
        audience: "Rented homes and PG accommodations",
        reason: "avoid disputes with landlords over clogged drain repair costs",
      },
      {
        audience: "Elderly parents' home",
        reason:
          "simple peel-and-stick solution, no need to bend and clean dirty drains",
      },
    ],
    faqs: [
      {
        question: "Will the mesh slow down water drainage?",
        answer:
          "No — the fine holes are designed to trap hair and debris while allowing full water flow. Your sink drains at the same speed as before.",
      },
      {
        question: "How do I remove it when it's time to replace?",
        answer:
          "Just peel it off from one corner. If any residue remains, use the included scraper with warm soapy water to clean the surface.",
      },
      {
        question: "Can I use it in the shower drain too?",
        answer:
          "Absolutely — this roll works on kitchen sinks, bathroom sinks, shower drains, and laundry tub drains. Cut the size you need for any drain.",
      },
    ],
    reviews: [
      {
        name: "Suresh G.",
        city: "Chennai",
        rating: 5,
        text: "Our kitchen sink used to clog every two weeks. I tried everything — boiling water, vinegar, expensive liquids. This mesh roll solved it in seconds. Three months and zero clogs.",
      },
      {
        name: "Pooja M.",
        city: "Lucknow",
        rating: 5,
        text: "I have long hair and my shower drain was a nightmare. This mesh catches everything. It's so satisfying to see all the hair on the mesh instead of in the pipe. Buying another roll.",
      },
      {
        name: "Anita D.",
        city: "Pune",
        rating: 4,
        text: "Easy to use and works well. The roll is very long — I've done all 4 sinks in my house and still have plenty left. The included tweezers are handy for placement.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Magnetic USB Cable (3-in-1)
  // ===================================================================
  "magnetic-usb-cable-3-in-1": {
    pageTitle:
      "Charge your smartwatch magically — magnetic USB cable, fast charging, fits all models, 1 meter",
    tagline:
      "Just snap your watch onto the magnetic pad and it starts charging — no fumbling with tiny plugs, no alignment needed",
    benefits: [
      { icon: "ti ti-bolt", label: "Fast magnetic charging" },
      { icon: "ti ti-device-watch", label: "Fits all smartwatches" },
      { icon: "ti ti-backpack", label: "Portable 1m cable" },
      { icon: "ti ti-shield-check", label: "Over-charge protection" },
    ],
    bulletBenefits: [
      "Magnetic tip snaps onto your watch automatically — no plug alignment needed, just bring it close and it locks in place",
      "Built-in smart chip protection — guards against over-current, over-voltage, and short-circuit while charging your device",
      "One-handed magnetic connection — works even in the dark, perfect for bedside charging without fumbling for cables",
      "Charges faster than standard cables — replaces broken OEM chargers and saves ₹1,500+ on original replacements",
      "7-day no-questions return — if it doesn't charge your device properly, we pick it up free and refund you fully",
    ],
    painPoints: [
      "Tiny charging pins that never align on the first try — frustrating every night",
      "OEM cables that break within months and cost a fortune to replace",
      "Forgetting to charge and waking up to a dead watch",
    ],
    solutionPoints: [
      "Magnetic snap connects instantly — drops right into place every single time",
      "Durable build that lasts — no frayed wires, no loose connections",
      "Fast, reliable charge so your watch is ready when you wake up",
    ],
    problemHook:
      "You come home tired, and the last thing you want is to fiddle with a tiny charging cable in the dark. The connector never aligns on the first try. The cheap cable frayed within weeks. And if you forget to charge overnight? A dead watch means no alarms, no fitness tracking, no notifications all day.",
    solutionBody:
      "This magnetic charging cable takes the frustration out of charging your smartwatch. The magnetic tip grabs your watch the moment it's close enough — no precision alignment, no awkward angles, no fiddling. Just bring your watch near and it snaps into place, starting to charge immediately. The 1-metre length is perfect for bedside tables, office desks, or travel bags. With built-in safety protection against over-current and short-circuits, your device stays safe while charging every single time.",
    whatsInTheBox: {
      Included: "1× Magnetic USB charging cable",
      Length: "1 metre",
      Connector: "USB A 3.0",
      Material: "Durable nylon braided cable",
      Weight: "50 g",
      Colour: "White",
      Compatibility: "All magnetic smartwatch charging models",
      Safety: "Over-current, over-voltage, short-circuit protection",
    },
    perfectFor: [
      {
        audience: "Smartwatch users",
        reason:
          "who charge daily and want a hassle-free experience every single night",
      },
      {
        audience: "Travelers",
        reason:
          "who need a compact, portable cable that fits in any bag pocket",
      },
      {
        audience: "Anyone tired of broken cables",
        reason: "who's replaced OEM chargers multiple times at high cost",
      },
      {
        audience: "Perfect backup or office cable",
        reason: "keep one at work, one at home, never carry cables again",
      },
    ],
    faqs: [
      {
        question: "Will this work with my smartwatch model?",
        answer:
          "Compatible with all smartwatches that use a magnetic charging puck. The magnetic connection is universal for standard smartwatch charging layouts.",
      },
      {
        question: "Is the charging speed faster than the original cable?",
        answer:
          "Yes — USB A 3.0 delivers higher power transfer compared to standard USB 2.0 cables, reducing your watch's charging time noticeably.",
      },
      {
        question: "Does the magnetic connection hold securely?",
        answer:
          "The built-in magnet is strong enough to hold your watch in place on the charger. Your watch won't slip off even with minor bumps or movement.",
      },
    ],
    reviews: [
      {
        name: "Deepa K.",
        city: "Hyderabad",
        rating: 5,
        text: "This is so much better than the original charger. The magnetic snap is satisfying and I don't have to struggle in the dark anymore. Great quality for the price.",
      },
      {
        name: "Akash M.",
        city: "Pune",
        rating: 4,
        text: "Bought this as a spare for office. Works exactly as described. The nylon braid feels premium and the magnetic hold is strong. Perfect secondary cable.",
      },
      {
        name: "Kavita R.",
        city: "Bangalore",
        rating: 5,
        text: "My old charging cable was on its last legs. This one charges faster and the magnetic connection is way better. At ₹145, it's a no-brainer replacement.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Menstrual Heating Pad (USB)
  // ===================================================================
  "menstrual-heating-pad-usb": {
    pageTitle:
      "Ease period pain — USB heating & massage pad, 9 levels, cordless rechargeable",
    tagline:
      "Finally, period relief that goes wherever you go — warmth and vibration soothe cramps without anyone noticing",
    benefits: [
      { icon: "ti ti-heartbeat", label: "9 heat + 9 massage modes" },
      { icon: "ti ti-battery-charging", label: "1800 mAh, cordless" },
      { icon: "ti ti-wind", label: "Soft velvet, skin-friendly" },
      { icon: "ti ti-shield-check", label: "1-year warranty" },
    ],
    bulletBenefits: [
      "Instant heat therapy from 35°C to 65°C with 9 precise levels — targets period cramps, lower back pain, and muscle tension exactly where it hurts",
      "Ultra-soft velvet interior against your skin — gentle enough to wear directly without a layer underneath, no irritation even on sensitive skin",
      "Wear it under your clothes and go about your day — cordless, noiseless, and completely invisible with the adjustable waist belt",
      "One ₹399 pad replaces endless painkillers, hot water bottles, and electric blankets — saves ₹3,000+ per year on period pain management",
      "1-year warranty backed by Indian support — if the heating, battery, or massage stops working within 12 months, we replace it free",
    ],
    painPoints: [
      "Every month, those cramps hit and the only option is curling up with a hot water bottle that goes cold in 20 minutes",
      "Painkillers that take 30 minutes to work and wear off before the pain does",
      "Missing work, college, or plans because the pain makes everything impossible",
    ],
    solutionPoints: [
      "35°C to 65°C heat that stays consistent for hours — soothing cramps before they take over your day",
      "Gentle vibration massage that relaxes muscles while the heat penetrates deep",
      "Cordless, quiet, and discreet — wear it under your clothes and go about your normal day",
    ],
    problemHook:
      "When period cramps hit, they don't ask if you have time. You're at work, at college, or at home, and suddenly the pain doubles you over. Painkillers work — until they wear off. Hot water bottles help — for 20 minutes, then you're refilling them again. The heating pads you've tried are either plugged into a wall or lose heat too fast. You shouldn't have to choose between managing pain and living your life.",
    solutionBody:
      "This cordless USB heating pad combines deep-penetrating heat therapy with gentle vibration massage — both adjustable to exactly the level you need. Wrap it around your waist with the adjustable belt (fits up to 64 inches), turn it on, and feel the warmth start soothing your lower belly and back within seconds. The 1800 mAh battery gives you up to 14 uses per charge, so you can wear it through a full workday, commute, or overnight. The soft velvet layer touches your skin gently — no rough edges, no bulk, no noise. Just warmth, vibration, and relief.",
    whatsInTheBox: {
      Included:
        "1× Heating pad · 1× USB charging cable · 1× Adjustable waist belt",
      "Heat levels": "9 levels (35°C to 65°C)",
      "Massage modes": "3 modes × 9 vibration gears",
      Battery: "1800 mAh rechargeable (13-14 uses per charge)",
      Material: "Soft velvet exterior",
      Colour: "Turquoise",
      "Belt length": "Adjustable up to 64 inches",
      Technology: "Polyimide Film Heating — uniform warmth, fast response",
      Warranty: "1 year",
    },
    perfectFor: [
      {
        audience: "Women with intense period cramps",
        reason:
          "who need reliable, consistent heat that doesn't fade after 20 minutes",
      },
      {
        audience: "Working women and college students",
        reason:
          "who can't afford to miss days every month because of period pain",
      },
      {
        audience: "Anyone tired of pills",
        reason:
          "looking for natural, drug-free pain relief without side effects",
      },
      {
        audience: "Perfect gift for sisters, friends, or colleagues",
        reason: "thoughtful, practical, and something every woman needs",
      },
    ],
    faqs: [
      {
        question: "Can I wear it while sleeping?",
        answer:
          "Yes — the auto-timer feature ensures safe usage. The noiseless operation and soft fabric make it comfortable for overnight wear without disturbance.",
      },
      {
        question: "Is it safe to use directly on skin?",
        answer:
          "Absolutely — the velvet fabric is skin-friendly and gentle. You can wear it directly against your stomach or back without any layer in between.",
      },
      {
        question: "How long does the battery last on a full charge?",
        answer:
          "The 1800 mAh battery delivers up to 13-14 full uses. Each session lasts 60-90 minutes depending on the heat and massage level selected.",
      },
    ],
    reviews: [
      {
        name: "Megha P.",
        city: "Bangalore",
        rating: 5,
        text: "This pad has been a lifesaver. I used to spend the first two days of my period in bed with a hot water bottle. Now I wear this under my clothes and actually go to work. The heat stays consistent.",
      },
      {
        name: "Shruti K.",
        city: "Pune",
        rating: 5,
        text: "I've tried so many heating pads and none compare to this. The 9 heat levels mean I can start low and increase as needed. The massage vibration is a bonus. Bought one for my sister too.",
      },
      {
        name: "Ayesha M.",
        city: "Hyderabad",
        rating: 4,
        text: "Great product for the price. The battery lasts through my entire workday. My only suggestion would be a longer USB cable for charging. But the pad itself is excellent.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
      { icon: "🛡️", text: "1-year warranty included" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Posture Corrector Belt
  // ===================================================================
  "posture-corrector-belt": {
    pageTitle:
      "Fix your posture — back support belt, breathable, adjustable for men & women",
    tagline:
      "Wear it 1 hour a day and feel your shoulders open — stand taller, breathe easier, look more confident",
    benefits: [
      { icon: "ti ti-accessible", label: "Corrects hunchback" },
      { icon: "ti ti-wind", label: "Breathable neoprene" },
      { icon: "ti ti-arrows-shuffle", label: "Universal size" },
      { icon: "ti ti-eye", label: "Wear under clothes" },
    ],
    bulletBenefits: [
      "Gently pulls your shoulders back and aligns your spine — trains muscle memory so correct posture becomes automatic over time",
      "Premium breathable neoprene — no latex, no skin irritation, soft padding prevents digging even during extended daily wear",
      "Slip it on like a backpack, adjust the straps, and secure the waist belt — takes 30 seconds, wear it under any shirt",
      "One ₹279 belt replaces costly physiotherapy sessions and chiropractor visits — saves ₹8,000+ per year on posture correction",
      "7-day no-questions return — if the fit is wrong or it doesn't improve your posture, we pick it up free and refund you fully",
    ],
    painPoints: [
      "Hours of slouching at your desk leaves you with rounded shoulders and neck pain",
      "Hunched posture affects how people perceive you and how you feel about yourself",
      "Back and shoulder pain that gets worse every year as poor posture becomes permanent",
    ],
    solutionPoints: [
      "Shoulders roll back naturally — your spine aligns, your chest opens, you stand taller",
      "Neck and upper back pain reduces significantly after consistent daily use",
      "You develop healthy posture habits even when you're not wearing the belt",
    ],
    problemHook:
      "You sit at a desk for 8 hours a day. You look down at your phone for another 3. Over months and years, your shoulders have slowly curled forward, your head juts out, and your upper back has begun to hunch. You catch your reflection sometimes and don't recognise your own posture. Your neck aches by evening, your upper back is stiff, and no amount of 'sit up straight' reminders seem to help.",
    solutionBody:
      "This posture corrector belt works like a gentle coach for your back. It pulls your shoulders into proper alignment and holds your spine in its natural position — training your muscles to maintain correct posture even when you're not wearing it. Simply put it on like a backpack, adjust the shoulder straps, fasten the waist belt, and you'll feel your shoulders open and your chest lift immediately. The breathable neoprene material keeps you cool, and the low-profile design fits discreetly under any shirt or dress. Wear it 1-2 hours daily for 30 days and notice how standing straight starts to feel natural.",
    whatsInTheBox: {
      Included: "1× Posture corrector belt",
      Size: "Universal — fits most body types",
      Material: "Breathable neoprene (latex-free)",
      Colour: "Beige / Black",
      Straps: "Adjustable shoulder straps + waist belt",
      Design: "Low-profile, wearable under clothes",
      Weight: "Lightweight — zero bulk",
      Style: "Backpack-style easy wear",
    },
    perfectFor: [
      {
        audience: "Desk workers and WFH employees",
        reason: "who spend 8+ hours hunched over laptops every single day",
      },
      {
        audience: "College students",
        reason:
          "hours of studying, phone scrolling, and laptop use are shaping poor posture early",
      },
      {
        audience: "People with early hunchback",
        reason: "correct it now before it becomes a permanent spinal condition",
      },
      {
        audience: "Perfect gift for parents or spouse",
        reason:
          "a practical health investment that shows you care about their wellbeing",
      },
    ],
    faqs: [
      {
        question: "How long should I wear it every day?",
        answer:
          "Start with 1-2 hours daily. Consistency matters more than duration. Over 30 days, your muscles learn to maintain posture even without the belt.",
      },
      {
        question: "Can I wear it under clothes without it being visible?",
        answer:
          "Yes — the slim, low-profile design fits discreetly under shirts, t-shirts, kurtas, and dresses. No one will know you're wearing it.",
      },
      {
        question: "Will it fit my body size?",
        answer:
          "The belt is universal size with fully adjustable straps and waist belt. It fits most adults from slim to plus-size body types comfortably.",
      },
    ],
    reviews: [
      {
        name: "Arjun T.",
        city: "Bangalore",
        rating: 5,
        text: "8 hours of coding every day had destroyed my posture. Two weeks with this belt and my shoulder pain is gone. My colleagues noticed I'm standing taller. Best ₹279 I've spent.",
      },
      {
        name: "Deepika S.",
        city: "Pune",
        rating: 5,
        text: "I used to have constant neck and upper back pain from looking down at my phone. This belt is so comfortable I forget I'm wearing it. After a month, I sit straighter naturally.",
      },
      {
        name: "Rajesh N.",
        city: "Ahmedabad",
        rating: 4,
        text: "Good build quality, comfortable for daily wear. I wear it during my 1-hour commute and while working. My wife says my posture has visibly improved in just 3 weeks.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Silicone Oil Splatter Guard
  // ===================================================================
  "silicone-oil-splatter-guard": {
    pageTitle:
      "Stop oil splatters while frying — silicone mesh guard fits all pans & kadais, food-grade",
    tagline:
      "Make tadka and deep fry without the burn scare — your stove, walls, and hands stay completely clean",
    benefits: [
      { icon: "ti ti-shield-check", label: "BIS certified safe" },
      { icon: "ti ti-leaf", label: "Food-grade silicone" },
      { icon: "ti ti-wash-machine", label: "Dishwasher safe" },
      { icon: "ti ti-ruler", label: "Universal fit" },
    ],
    bulletBenefits: [
      "Zero oil splatter — the fine silicone mesh traps 99% of hot oil drops while letting steam pass through for perfect cooking",
      "100% food-grade silicone, BIS certified — no harmful chemicals, heat-safe up to 230°C, safe for daily Indian cooking",
      "Just place it over any pan or kadai — no clips, no magnets, no setup. Rinse clean in 10 seconds after cooking",
      "Saves ₹800+ per year on stove cleaning supplies and servicing — replaces paper towels, foil, and disposable splatter screens",
      "7-day no-questions return — we collect from your door free if it does not fit your cookware or meet your expectations",
    ],
    painPoints: [
      "Hot oil burns your hands and arms every time you make tadka or deep fry",
      "Greasy stovetop, oily walls, and messy countertops that take 20 minutes to clean",
      "That moment of fear every time water hits hot oil — the splatter goes everywhere",
    ],
    solutionPoints: [
      "Oil stays inside the pan — no burns, no splatter, no fear while frying",
      "Wipe the stove clean in seconds — no soaking, no scrubbing, no degreaser needed",
      "Your kitchen stays spotless while your food cooks perfectly",
    ],
    problemHook:
      "Every time you make tadka or drop something into hot oil, you brace yourself. The oil splatters everywhere — on your hands, the stove, the wall behind. You spend more time scrubbing the greasy stovetop than you spent cooking. And deep down, you're waiting for the day that splash lands on your skin and leaves a burn.",
    solutionBody:
      "This food-grade silicone mesh guard sits over your pan or kadai and blocks oil splatter before it leaves the surface. Steam escapes through the fine mesh so your food cooks perfectly — biryani, pakoras, puris, everything — while every single oil drop stays trapped inside. No clips, no magnets, no complicated setup. Just place it on top and cook. When you're done, rinse it under the tap or put it in the dishwasher. Your stove is clean. Your hands are safe. Your kitchen walls stay spotless.",
    whatsInTheBox: {
      Included: "1× Silicone splatter guard · 1× Storage ring",
      Size: "28 cm diameter (fits pans & kadais up to 32 cm)",
      Material: "BIS-certified food-grade silicone",
      "Heat safe": "Up to 230°C",
      Colour: "Black / Grey",
      Cleaning: "Dishwasher safe or rinse in 10 seconds",
      Weight: "Lightweight, flexible, folds flat for storage",
    },
    perfectFor: [
      {
        audience: "Daily home cooks",
        reason:
          "who make tadka, deep fry, or sauté regularly and are tired of cleaning up oil mess",
      },
      {
        audience: "Working parents",
        reason:
          "who want faster cleanup after cooking so they can spend time with family",
      },
      {
        audience: "Anyone gifting for housewarming or wedding",
        reason: "practical, useful, every kitchen needs one",
      },
      {
        audience: "Hostel and PG kitchens",
        reason: "shared stovetops stay clean, no arguments over grease mess",
      },
    ],
    faqs: [
      {
        question: "Is it safe for non-stick pans?",
        answer:
          "Yes — 100% food-grade silicone won't scratch any surface including non-stick, ceramic, cast iron, or stainless steel.",
      },
      {
        question: "Will it fit my kadai or deep frying pan?",
        answer:
          "The 28 cm guard fits most Indian kadais and pans up to 32 cm diameter. The flexible silicone conforms to round, flat, and curved cookware.",
      },
      {
        question: "Does steam get trapped inside?",
        answer:
          "No — the fine mesh allows steam to escape freely while blocking liquid oil droplets. Your food cooks exactly as it should.",
      },
    ],
    reviews: [
      {
        name: "Sunita P.",
        city: "Jaipur",
        rating: 5,
        text: "I was tired of cleaning oil off my tiles every single day. This guard changed everything. The stove is clean, my hands are safe, and it fits my kadai perfectly.",
      },
      {
        name: "Amit K.",
        city: "Surat",
        rating: 5,
        text: "I make pakoras almost every evening. Used to dread the cleanup. Now I just rinse this guard under the tap and I'm done in 10 seconds. Best ₹179 I've spent.",
      },
      {
        name: "Lakshmi R.",
        city: "Chennai",
        rating: 4,
        text: "Good quality silicone, feels sturdy. Fits my stainless steel pans well. I wish I'd bought this years ago — would have saved so much scrubbing and degreaser.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Waterproof Phone Pouch
  // ===================================================================
  "waterproof-phone-pouch": {
    pageTitle:
      'Keep phone dry underwater — waterproof pouch for all phones up to 7", pack of 2 with lanyard',
    tagline:
      "Swim, snorkel, or kayak without worrying about your phone — full touch support and clear photos underwater",
    benefits: [
      { icon: "ti ti-droplet", label: "Waterproof up to 30m" },
      { icon: "ti ti-device-mobile", label: 'Fits phones up to 7"' },
      { icon: "ti ti-camera", label: "Clear underwater photos" },
      { icon: "ti ti-components", label: "Pack of 2" },
    ],
    bulletBenefits: [
      "IPX8 certified waterproof protection up to 30 metres — take photos, videos, and calls underwater without risking your phone",
      "Food-grade ABS locking clasp and eco-friendly TPU material — secure seal tested for submersion, no leaks guaranteed",
      "Transparent touch-responsive window — full screen usability above water, use volume buttons to capture photos underwater",
      "Two pouches in one pack — one for you, one for a friend, costs ₹80 less than buying single pouches separately",
      "7-day no-questions return — if water gets in or it doesn't fit your phone, we pick it up free and refund you fully",
    ],
    painPoints: [
      "Can't take that perfect beach selfie without risking your phone",
      "One splash or drop in water means a dead phone and expensive repair",
      "Always leaving your phone behind when swimming, boating, or rafting",
    ],
    solutionPoints: [
      "Take crystal-clear photos and videos underwater — phone stays 100% dry",
      "Swim, snorkel, kayak, or ride water slides with your phone safe and visible",
      "Two pouches mean you and a friend can both capture the adventure",
    ],
    problemHook:
      "You're at the beach, the pool, or a waterfall — and you have to choose between capturing the moment and keeping your phone safe. One stray splash, one unexpected wave, and your ₹20,000+ phone is done for. Water damage isn't covered by warranty, and repair costs more than a new phone. So your phone stays locked in the bag while everyone else is making memories.",
    solutionBody:
      "This waterproof pouch seals your phone completely inside a transparent, touch-friendly case that stays dry up to 30 metres underwater. The food-grade ABS clasp locks tight — no water gets in, no phone gets wet. The crystal-clear TPU window lets you use your touchscreen, take photos, and even record videos underwater using the volume button. An adjustable lanyard keeps it secure around your neck or wrist. Two pouches per pack means you and a travel partner can both stay connected.",
    whatsInTheBox: {
      Included: "2× Waterproof phone pouches + 2× adjustable lanyards",
      "Waterproof rating": "IPX8 — up to 30 m (100 feet)",
      Compatibility: "All smartphones up to 7 inches",
      Material: "Food-grade ABS clasp + eco-friendly TPU transparent window",
      "Lanyard strength": "Supports up to 20 kg",
      Colour: "Black",
      "Use cases":
        "Swimming, snorkelling, kayaking, boating, fishing, skiing, beach",
    },
    perfectFor: [
      {
        audience: "Beach and pool lovers",
        reason:
          "who want to take photos without leaving their phone on the towel",
      },
      {
        audience: "Snorkellers and divers",
        reason: "who need their phone accessible and dry underwater",
      },
      {
        audience: "Travelers",
        reason:
          "visiting waterfalls, rainy destinations, or doing water activities",
      },
      {
        audience: "Perfect gift for adventure friends",
        reason: "two-pack means share one, keep one",
      },
    ],
    faqs: [
      {
        question: "Can I use my touchscreen through the pouch?",
        answer:
          "Yes — the TPU material is responsive to touch. For underwater use, use the volume buttons to capture photos since water pressure may reduce touch sensitivity.",
      },
      {
        question: "Will my phone fit with a thick case on?",
        answer:
          "The pouch fits phones up to 7 inches. Slim cases should fit, but thick or bulky cases may need to be removed before inserting into the pouch.",
      },
      {
        question: "How do I test if the pouch is sealed properly?",
        answer:
          "Before first use, seal the pouch with a tissue inside and submerge it for 2-3 minutes. If the tissue stays dry, your seal is perfect.",
      },
    ],
    reviews: [
      {
        name: "Meera D.",
        city: "Goa",
        rating: 5,
        text: "Used these at Butterfly Beach — took amazing underwater photos of fish and coral. Not a single drop inside. The two-pack meant my friend used the other one too.",
      },
      {
        name: "Rohan B.",
        city: "Mumbai",
        rating: 4,
        text: "Perfect for monsoon trips to Lonavala. Used it at a waterfall and my phone stayed completely dry. Touch works fine above water. Great value for a 2-pack.",
      },
      {
        name: "Priyanka S.",
        city: "Kerala",
        rating: 5,
        text: "Took these on our houseboat trip in Alleppey. We were in and out of the water all day and our phones survived every splash. The lanyard is strong and comfortable.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },

  // ===================================================================
  // Waterproof Shoe Covers
  // ===================================================================
  "waterproof-shoe-covers": {
    pageTitle:
      "Keep shoes dry in rain — waterproof shoe covers with anti-slip sole, reusable for men & women",
    tagline:
      "Walk through puddles without worry — your shoes stay bone dry while the anti-slip sole keeps you safe on wet floors",
    benefits: [
      { icon: "ti ti-droplet", label: "100% waterproof" },
      { icon: "ti ti-refresh", label: "Reusable & foldable" },
      { icon: "ti ti-grip-vertical", label: "Anti-slip sole" },
      { icon: "ti ti-backpack", label: "Packs in your bag" },
    ],
    bulletBenefits: [
      "100% waterproof protection — keeps your shoes completely dry in heavy rain, puddles, and wet streets all season long",
      "Premium polyester with TPE anti-slip sole — sturdy rubber tread grips wet floors and prevents slips on smooth surfaces",
      "Side zipper and elastic top — slip them on over any shoe in seconds, no tying or adjusting needed",
      "One pair replaces multiple wet shoe cleanings — saves ₹2,000+ per year in shoe repairs and replacements",
      "7-day no-questions return — if they don't fit or leak, we pick them up free and refund every rupee",
    ],
    painPoints: [
      "Socks soaked before you reach the office — miserable all day",
      "Shoes ruined by monsoon puddles and muddy streets",
      "Slipping on wet tiles and smooth floors is a real fear",
    ],
    solutionPoints: [
      "Shoes stay bone dry — walk through any puddle without a second thought",
      "One pair lasts the entire rainy season, wear after wear",
      "Firm grip on wet surfaces — safe for office, market, and travel",
    ],
    problemHook:
      "Monsoon mornings are a nightmare for your shoes. One wrong step into a puddle and your socks are soaked, your shoes are ruined, and you're stuck in wet footwear for the next eight hours. Slippery floors at the office entrance add another layer of worry. You shouldn't have to choose between style and staying dry.",
    solutionBody:
      "These waterproof shoe covers slide over your regular shoes in seconds and create a complete barrier against rain, puddles, and mud. The side zipper makes them easy to put on and take off, while the elastic top keeps them securely in place as you walk. The anti-slip TPE sole grips wet surfaces firmly — no more sliding at the office entrance or market walkways. When you reach your destination, just zip them off, fold them up, and stash them in your bag until the next downpour.",
    whatsInTheBox: {
      Included: "1 pair (2 pieces) waterproof shoe covers",
      Size: "L (40-42 EU / 30.5 cm sole length)",
      Material: "Premium polyester upper, TPE anti-slip sole",
      Closure: "Waterproof side zipper + elastic top band",
      Colour: "Black",
      Weight: "Lightweight — folds flat into any bag",
      Special: "Reflective strip for night visibility",
    },
    perfectFor: [
      {
        audience: "Office commuters",
        reason: "who walk or take public transport in monsoon season",
      },
      {
        audience: "College students",
        reason: "who can't afford to sit through lectures in wet shoes",
      },
      {
        audience: "Bike and scooter riders",
        reason: "whose shoes take the first splash of every puddle",
      },
      {
        audience: "Perfect travel companion",
        reason:
          "foldable design fits in a suitcase or backpack for any rainy destination",
      },
    ],
    faqs: [
      {
        question: "Will these fit over my sports shoes and formal shoes?",
        answer:
          "Yes — size L fits most men's and women's shoes up to size 42 EU. The elastic top stretches to accommodate different shoe profiles.",
      },
      {
        question: "Are they actually reusable or do they tear after one use?",
        answer:
          "Fully reusable. The polyester upper and TPE sole are built to last multiple seasons. Just rinse and air dry after use.",
      },
      {
        question: "Do they fog up or make shoes sweaty inside?",
        answer:
          "The breathable polyester material allows air circulation while blocking water. Your shoes stay dry both from rain and from sweat.",
      },
    ],
    reviews: [
      {
        name: "Rahul P.",
        city: "Mumbai",
        rating: 5,
        text: "Finally, a solution for Mumbai monsoons! Walked from station to office in heavy rain — not a single drop inside. The grip on wet stairs is excellent. Absolutely worth ₹99.",
      },
      {
        name: "Sneha V.",
        city: "Bangalore",
        rating: 4,
        text: "I keep a pair in my office bag and one at home. Perfect for those unexpected downpours. The zipper makes them easy to take off without touching the wet part.",
      },
      {
        name: "Arjun S.",
        city: "Chennai",
        rating: 5,
        text: "Bought these for my daily bike commute. My shoes used to get drenched every single day. Now I arrive dry. The reflective strip is a nice safety touch for night riding.",
      },
    ],
    trustItems: [
      { icon: "✅", text: "100% original product" },
      { icon: "🚚", text: "Free delivery above ₹299" },
      { icon: "🔄", text: "7-day easy return" },
      { icon: "🔒", text: "Secure checkout" },
    ],
    stockWarning: "Low stock — selling fast",
  },
};

/** Helper to get rich content for a product by slug */
export function getProductContent(slug: string): ProductRichContent | null {
  return PRODUCT_RICH_CONTENT[slug] ?? null;
}
