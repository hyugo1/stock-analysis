import nodemailer from 'nodemailer';
import {NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

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
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

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
