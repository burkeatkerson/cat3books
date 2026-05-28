export const site = {
  name: "Cat3 Books",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cat3books.com",
  email: "hello@cat3books.com",
  phone: "+15551234567",
  description:
    "The only bookkeeping firm built exclusively for restoration contractors. Job costing, supplement recovery, expense management, fractional CFO — restoration only, always.",
} as const;
