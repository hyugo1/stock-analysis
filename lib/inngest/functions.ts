// lib/inngest/functions.ts

import {inngest} from "@/lib/inngest/client";
import {PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import {sendWelcomeEmail} from "@/lib/nodemailer";

// Direct Gemini API call function
async function callGeminiAPI(prompt: string): Promise<string> {
    const apiKey = process.env.GOOGLE_GEMINI_KEY;
    
    if (!apiKey) {
        throw new Error('GOOGLE_GEMINI_KEY is not set');
    }

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
