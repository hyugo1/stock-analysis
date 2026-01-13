import nodemailer from 'nodemailer';
import {NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({ email, name, intro, unsubscribeToken }: WelcomeEmailData & { unsubscribeToken?: string }) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://marketpulse-taupe.vercel.app";
    const unsubscribeUrl = unsubscribeToken 
        ? `${baseUrl}/api/unsubscribe?token=${unsubscribeToken}`
        : `${baseUrl}/unsubscribe`;

    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro)
        .replace(/href="{{unsubscribeUrl}}"/g, `href="${unsubscribeUrl}"`);

    const mailOptions = {
        from: `"MarketPulse" <marketpulse.dev@gmail.com>`,
        to: email,
        subject: "Welcome to MarketPulse🚀",
        text: 'Thank you for joining MarketPulse!',
        html: htmlTemplate,
    }

    // await transporter.sendMail(mailOptions);
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Failed to send welcome email via nodemailer', {
            to: email,
            error,
        });
        throw new Error('Failed to send welcome email. Please try again later.');
    }
}


export const sendDailyNewsSummaryEmail = async (
    { email, date, newsContent, unsubscribeToken }: { email: string; date: string; newsContent: string; unsubscribeToken?: string }
): Promise<void> => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://marketpulse-taupe.vercel.app";
    const unsubscribeUrl = unsubscribeToken 
        ? `${baseUrl}/api/unsubscribe?token=${unsubscribeToken}`
        : `${baseUrl}/unsubscribe`;

    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent)
        .replace(/href="#"/g, `href="${unsubscribeUrl}"`)
        .replace('{{unsubscribeUrl}}', unsubscribeUrl);

    const mailOptions = {
        from: `"MarketPulse News" <marketpulse.dev@gmail.com>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from MarketPulse`,
        html: htmlTemplate,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Failed to send daily news summary email via nodemailer', {
            to: email,
            date,
            error,
        });
        throw new Error('Failed to send daily news summary email. Please try again later.');
    }
};
