// lib/inngest/functions.ts

import {inngest} from "@/lib/inngest/client";
import {NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import {sendDailyNewsSummaryEmail, sendWelcomeEmail} from "@/lib/nodemailer";
import {getAllUsersForNewsEmail} from "@/lib/actions/user.actions";
import {getWatchlistSymbolsByEmail} from "@/lib/actions/watchlist.actions";
import {getNews} from "@/lib/actions/finnhub.actions";
import {getFormattedTodayDate} from "@/lib/utils";

// Direct Gemini API call function
async function callGeminiAPI(prompt: string): Promise<string> {
    const apiKey = process.env.GOOGLE_GEMINI_KEY;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const part = data.candidates?.[0]?.content?.parts?.[0];
    return (part && 'text' in part ? part.text : '') || 'Thanks for joining MarketPulse!';
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
    { id: 'marketpulse-daily-news-summary' },
    [ { event: 'app/send.daily.news' }, 
      { cron: '0 12 * * *' } 
    ],
    async ({ step }) => {
        // Step #1: Get all users for news delivery
        const users = await step.run('get-all-users', getAllUsersForNewsEmail)

        if(!users || users.length === 0) return { success: false, message: 'No users found for news email' };

        // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
        const results = await step.run('fetch-user-news', async () => {
            const perUser: Array<{ user: User; articles: MarketNewsArticle[] }> = [];
            for (const user of users as User[]) {
                try {
                    const symbols = await getWatchlistSymbolsByEmail(user.email);
                    let articles = await getNews(symbols);
                    // Enforce max 6 articles per user
                    articles = (articles || []).slice(0, 6);
                    // If still empty, fallback to general
                    if (!articles || articles.length === 0) {
                        articles = await getNews();
                        articles = (articles || []).slice(0, 6);
                    }
                    perUser.push({ user, articles });
                } catch (e) {
                    console.error('daily-news: error preparing user news', user.email, e);
                    perUser.push({ user, articles: [] });
                }
            }
            return perUser;
        });

        // Step #3: Summarize news via AI
        const userNewsSummaries: { user: User; newsContent: string | null}[] = [];

        for (const { user, articles } of results) {
                try {
                    const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

                    // Use direct API call instead of step.ai.infer
                    const newsContent = await step.run(`summarize-news-${user.email}`, async () => {
                        return await callGeminiAPI(prompt);
                    });

                    userNewsSummaries.push({ user, newsContent: newsContent || 'No market news.' });
                } catch (e) {
                    console.error('Failed to summarize news for : ', user.email);
                    userNewsSummaries.push({ user, newsContent: null });
                }
            }

        await step.run('send-news-emails', async () => {
            const todayDate = getFormattedTodayDate();
            const results = await Promise.allSettled(
                userNewsSummaries
                    .filter(({ newsContent }) => newsContent)
                    .map(({ user, newsContent }) =>
                        sendDailyNewsSummaryEmail({ email: user.email, date: todayDate, newsContent: newsContent! })
                    )
            );
            const failures = results.filter((r) => r.status === 'rejected');
            if (failures.length > 0) {
                console.error('Some emails failed to send:', failures);
            }
        });

        return { success: true, message: 'Daily news summary emails sent successfully' }
    }
)