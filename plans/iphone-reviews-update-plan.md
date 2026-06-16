# iPhone 15 Pro Max 512GB — Reviews Update Plan

## Overview

Update customer names and add new low-star reviews to the iPhone 15 Pro Max product page. Only the file `src/lib/iphone-15-pro-max-data.ts` needs to be modified; no other files or styles should change.

## Data Model Reference

The [`ProductReviewDetail`](src/lib/types.ts:186) interface:

```typescript
interface ProductReviewDetail {
  id: string;
  name: string; // Full Indian name
  city: string; // "City, State" format
  rating: number; // 1-5
  title: string; // Short review headline
  text: string; // Full review body
  date: string; // ISO date string
  isVerified: boolean;
  helpfulCount: number;
}
```

## Task 1: Replace Names in Existing 27 Reviews

Parse the 28 provided names (format: `Name - City, State`) into separate `name` and `city` fields. Use the first 27 names to replace names in the existing reviews (leaving the review content/title/date/rating unchanged). Name mapping:

| #   | Name                   | City                                    | Replaces Review                     |
| --- | ---------------------- | --------------------------------------- | ----------------------------------- |
| 1   | Malavika Rajeev        | Harippad, Alappuzha                     | iphone-r1                           |
| 2   | Riya Chacko            | Irinjalakuda, Thrissur                  | iphone-r2                           |
| 3   | Faisal Rahman          | Kondotty, Malappuram                    | iphone-r3                           |
| 4   | S. Karthikeyan         | Ramnagar, Coimbatore                    | iphone-r4                           |
| 5   | Manjunath Gowda        | Malleshwaram, Bengaluru                 | iphone-r5                           |
| 6   | Javed Ahmed Gujjar     | Amargarh, Malerkotla                    | iphone-r6                           |
| 7   | Deepak Trivedi         | Waghodia Road, Vadodara                 | iphone-r7                           |
| 8   | Naveen Raj             | Rajajinagar, banglore                   | iphone-r8                           |
| 9   | Sneha George           | Marathahalli, banglore                  | iphone-r9                           |
| 10  | Divya Bharathi         | Ashok Nagar, tamil nadu                 | iphone-r10                          |
| 11  | Sandhya Ramachandran   | West mambalam, tamil nadu               | iphone-r11                          |
| 12  | Rachel Thomas          | Kochi, kerala                           | iphone-r12                          |
| 13  | Swathi Subramanian     | Thoraipakkam, chennai, nadu             | iphone-r13                          |
| 14  | Rishikanth reddy       | hyderabad                               | iphone-r14                          |
| 15  | Ameer shan             | kannur, kerala                          | iphone-r15                          |
| 16  | Aleena j               | banglore                                | iphone-r16                          |
| 17  | Anil kunnath           | wayanad, kerala                         | iphone-r17                          |
| 18  | Devendra Singh Rathore | Vaishali Nagar, Jaipur, Rajasthan       | iphone-r18                          |
| 19  | Alok Mishra            | Arera Colony, Bhopal, Madhya Pradesh    | iphone-r19                          |
| 20  | Irfan Ali              | Station Road, ajmer, Rajasthan          | iphone-r20                          |
| 21  | Vikas Kumar Sinha      | Kankarbagh, Patna, Bihar                | iphone-r21                          |
| 22  | Joyce Lal              | Landour, Mussoorie, Uttarakhand         | iphone-r22                          |
| 23  | Bilal Ahmad Bhat       | Sopore Town, Baramulla, Jammu & Kashmir | iphone-r23                          |
| 24  | Rajesh Tiwari          | Bistupur, Jamshedpur, Jharkhand         | iphone-r24                          |
| 25  | Joshua P               | Benaulim, Salcete, Goa                  | iphone-r25                          |
| 26  | Harpreet Kaur Sandhu   | Sector 22, Chandigarh, Chandigarh       | iphone-r26                          |
| 27  | Nitin Khanna           | Tilak Nagar, West Delhi                 | iphone-r27                          |
| 28  | Sharon k Paul          | Connaught Place Area, Central Delhi     | _(Used for one of the new reviews)_ |

## Task 2: Add 2 ★ Reviews (Rating: 1)

Focus on **product delay** but customer is ultimately **satisfied** with the product. Write naturally.

### Review 1 (1★) — id: `iphone-r28`

- **Name**: Sharon k Paul
- **City**: Connaught Place Area, Central Delhi
- **Rating**: 1
- **Title**: _"Delay was frustrating but the phone is great"_
- **Text**: Natural explanation focusing on shipping delay, but acknowledging product quality.
- **isVerified**: true
- **helpfulCount**: ~8

### Review 2 (1★) — id: `iphone-r29`

- **Name**: (Use a name from the unused list or a variation)
- **City**: (Corresponding city)
- **Rating**: 1
- **Title**: _"Worth the wait? Almost not — but yes"_
- **Text**: Another delay-focused review expressing frustration about delivery timeline but ultimately happy with the phone.
- **isVerified**: true
- **helpfulCount**: ~5

## Task 3: Add 2 ★★ Reviews (Rating: 2)

Focus on **packing quality** and **delivery boy approach/behavior**.

### Review 3 (2★) — id: `iphone-r30`

- **Name**: (Name from the list or complementary)
- **City**: (Corresponding city)
- **Rating**: 2
- **Title**: _"Packing could have been better"_
- **Text**: Focus on insufficient/loose packaging, box corners damaged, but phone untouched.
- **isVerified**: true
- **helpfulCount**: ~12

### Review 4 (2★) — id: `iphone-r31`

- **Name**: (Name from the list or complementary)
- **City**: (Corresponding city)
- **Rating**: 2
- **Title**: _"Delivery experience was disappointing"_
- **Text**: Focus on delivery person's approach/rudeness or lack of professionalism.
- **isVerified**: true
- **helpfulCount**: ~10

## Task 4: Update `IPHONE_REVIEW_SUMMARY`

Current:

```typescript
export const IPHONE_REVIEW_SUMMARY = {
  totalReviews: 27,
  averageRating: 4.8,
  ratingDistribution: { 5: 24, 4: 2, 3: 1, 2: 0, 1: 0 },
};
```

New:

```typescript
export const IPHONE_REVIEW_SUMMARY = {
  totalReviews: 31,
  averageRating: 4.4,
  ratingDistribution: { 5: 24, 4: 2, 3: 1, 2: 2, 1: 2 },
};
```

**Calculation**: (24×5 + 2×4 + 1×3 + 2×2 + 2×1) / 31 = (120 + 8 + 3 + 4 + 2) / 31 = 137 / 31 ≈ 4.419 → rounds to 4.4

## File to Modify

Only file: [`src/lib/iphone-15-pro-max-data.ts`](src/lib/iphone-15-pro-max-data.ts)

- Lines 108–406: Replace `IPHONE_REVIEWS` array (update names + append 4 new reviews)
- Lines 411–421: Replace `IPHONE_REVIEW_SUMMARY` with new values

No changes to components, styles, or any other files.

## Notes

- Keep all existing review content (title, text, rating, date, helpfulCount) untouched for the first 27 reviews — only change `name` and `city`.
- Dates for new reviews should be recent (May-June 2026) to appear naturally sorted as "most recent".
- Respect the existing "Name" and "City" field separation in the data model.
