// lib/inngest/functions.ts

import {inngest} from "@/lib/inngest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "@/lib/inngest/prompts";
import { getAllUsersForNewsEmail } from "@/lib/actions/user.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { getNews } from "@/lib/actions/finnhub.actions";
import { sendDailyNewsSummaryEmail, sendWelcomeEmail } from "@/lib/nodemailer";
import { getFormattedTodayDate } from "@/lib/utils";
import { getOrCreateNewsSection } from "./newsSections";
import { assembleNewsContent } from "./assembleNewsEmail";

// Direct Gemini API call function
async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_KEY;
    if (!apiKey) {
      console.error("Missing GOOGLE_GEMINI_KEY");
      return "Market summary unavailable today.";
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }), }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Gemini error:", response.status, text);
      return "Market summary unavailable today.";
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Market summary unavailable today.";
  } catch (err) {
    console.error("Gemini fetch failed:", err);
    return "Market summary unavailable today.";
  }
}

export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email' },
    { event: 'app/user.created'},
    async ({ event, step }) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        // Make direct API call instead of using step.ai.infer
        const introText = await step.run('generate-welcome-intro', async () => {
            return await callGeminiAPI(prompt);
        })

        await step.run('send-welcome-email', async () => {
            const { data: { email, name } } = event;
            return await sendWelcomeEmail({ email, name, intro: introText });
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }
  )

export const sendDailyNewsSummary = inngest.createFunction(
  { id: "marketpulse-daily-news-summary", retries: 5 },
  [{ cron: "0 12 * * *" }],
  async ({ step }) => {
    const users = await step.run("get-users", getAllUsersForNewsEmail);
    if (!users?.length) return;

    // Collect unique symbols
    const symbolSet = new Set<string>();
    const userSymbolsMap = new Map<string, string[]>();

    const userSymbolsList = await step.run("fetch-user-symbols", async () => {
        const results: Array<{ email: string; symbols: string[] }> = [];
        for (const user of users as User[]) {
        const symbols = await getWatchlistSymbolsByEmail(user.email);
        results.push({ email: user.email, symbols: symbols || [] });
        }
        return results;
    });

    for (const { email, symbols } of userSymbolsList) {
      userSymbolsMap.set(email, symbols);
      symbols.forEach((s) => symbolSet.add(s));
    }

    // Fetch news once per symbol
    const sectionMap: Record<string, string> = {};

    for (const symbol of symbolSet) {
      const articles = await step.run(`fetch-news-${symbol}`, async () => {
        return (await getNews([symbol]))?.slice(0, 6) || [];
      });
      if (!articles.length) continue;

      sectionMap[symbol] = await getOrCreateNewsSection({
        sectionKey: symbol,
        articles,
        step,
      });
    }

    // General fallback
    const generalArticles = await step.run("fetch-general-news", async () => {
      return (await getNews())?.slice(0, 6) || [];
    });
    const generalSection = await getOrCreateNewsSection({
      sectionKey: "general",
      articles: generalArticles,
      step,
    });

    // Send emails
    const date = getFormattedTodayDate();

    for (const user of users as User[]) {
      const symbols = userSymbolsMap.get(user.email) || [];

      const newsContent = assembleNewsContent({
        userSymbols: symbols,
        sectionMap,
        fallbackSection: generalSection,
      });

    await step.run(`send-email-${user.email}`, async () => {
    await sendDailyNewsSummaryEmail({
        email: user.email,
        date,
        newsContent,
    });
      });
    }

    return { success: true };
  }
);