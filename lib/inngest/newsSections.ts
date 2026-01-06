// lib/inngest/newsSections.ts

import { NEWS_SECTION_PROMPT } from "@/lib/inngest/prompts";
import { getCachedNews, setCachedNews } from "@/lib/cache/news.cache";
import { getFormattedTodayDate } from "@/lib/utils";
import { callGeminiAPI } from "@/lib/inngest/gemini";

export async function getOrCreateNewsSection({
  sectionKey,
  articles,
  step,
  userEmail, // optional: pass in to log which user is using this section
}: {
  sectionKey: string; // e.g. AAPL, TSLA, general
  articles: MarketNewsArticle[];
  step: any;
  userEmail?: string;
}) {
  const date = getFormattedTodayDate();
  const cacheKey = `news:${date}:${sectionKey}`;

  const cached = await getCachedNews(cacheKey);
  if (cached) {
    console.log(
      "CACHE HIT:",
      cacheKey,
      userEmail ? `(for user: ${userEmail})` : ""
    );
    return cached;
  }

  console.log(
    "CACHE MISS:",
    cacheKey,
    userEmail ? `(for user: ${userEmail})` : ""
  );

  const prompt = NEWS_SECTION_PROMPT
    .replace("{{sectionType}}", sectionKey)
    .replace("{{newsData}}", JSON.stringify(articles, null, 2));

  const html = await step.run(`summarize-${sectionKey}`, async () => {
    return await callGeminiAPI(prompt);
  });

  await setCachedNews(cacheKey, html);
  return html;
}