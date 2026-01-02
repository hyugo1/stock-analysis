// lib/inngest/client.ts

import { Inngest } from "inngest";

const GOOGLE_GEMINI_KEY = process.env.GOOGLE_GEMINI_KEY;

export const inngest = new Inngest({
  id: "MarketPulse",
  // 2. Pass it inside the 'ai' object specifically for gemini
  ai: {
    gemini: {
      apiKey: GOOGLE_GEMINI_KEY,
    },
  },
});
