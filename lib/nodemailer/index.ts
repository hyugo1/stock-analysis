import nodemailer from 'nodemailer';
import {NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

// Password reset email template
export const RESET_PASSWORD_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Reset Password</title>

    <!--[if mso]>
    <xml>
    <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

    <style>
        body, table, td, p, a {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        }
        table {
        border-spacing: 0;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        }
        img {
        border: 0;
        height: auto;
        line-height: 100%;
        }
        body {
        width: 100% !important;
        background-color: #0e0f14; 
        font-family: 'Segoe UI', sans-serif;
        }

        .email-wrapper {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        border-radius: 12px;
        overflow: hidden;
        }
        .section {
        padding: 35px 40px;
        }

        .neon {
        color: #10b981 !important;
        text-shadow:
            1px 1px 0 #000,
        -1px 1px 0 #000,
            1px -1px 0 #000,
        -1px -1px 0 #000;
        }
        .neon-link {
        color: #10b981 !important;
        text-decoration: none;
        }

        .header {
        background: #0e0f14;
        }
        .logo {
        font-size: 24px;
        font-weight: 700;
        color: #ffffff;
        }

        .content {
        background: #0a0a10;
        }
        .section-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-bottom: 8px;
        }

        .info-box {
        background: rgba(16,185,129,0.1);
        border: 1px solid rgba(16,185,129,0.3);
        border-radius: 10px;
        padding: 20px;
        margin: 25px 0;
        }
        .info-text {
        font-size: 15px;
        color: #cbd5e1;
        line-height: 1.6;
        margin: 0;
        }

        .footer {
        background: #0e0f14;
        text-align: center;
        }
        .footer-text {
        font-size: 13px;
        color: #94a3b8;
        line-height: 1.6;
        margin: 6px 0;
        }
        .footer-divider {
        width: 60px;
        height: 2px;
        margin: 20px auto;
        background: linear-gradient(90deg, rgba(16,185,129,0.8) 0%, transparent 100%);
        }

        @media only screen and (max-width: 600px) {
        .section { padding: 25px 20px; }
        .logo { font-size: 20px; }
        .info-box { padding: 16px; }
        }
    </style>
</head>

<body style="margin:0;padding:0;background-color:#0e0f14;font-family:'Segoe UI',sans-serif;">
    <center>
        <table role="presentation" width="100%" bgcolor="#0e0f14">
            <tr>
                <td align="center" style="padding:40px 10px;background-color:#0e0f14;">

                <table role="presentation" class="email-wrapper" bgcolor="#0e1116" style="border-radius:12px;overflow:hidden;">

                <!-- Header -->
                <tr>
                <td class="section header" bgcolor="#0e0f14" style="padding:35px 40px;background-color:#0e0f14;">
                <span class="logo" style="font-size:24px;font-weight:700;color:#ffffff;">MARKET<span style="color:#10b981;">PULSE</span></span>
                </td>
                </tr>

                <!-- Content -->
                <tr>
                <td class="section content" bgcolor="#0a0a10" style="padding:35px 40px;background-color:#0a0a10;">
                <h1 style="font-size:28px;font-weight:700;color:#ffffff;margin:0 0 20px 0;">Reset Your Password</h1>
                
                <div class="info-box">
                    <p class="info-text">We received a request to reset your MarketPulse password. Click the button below to create a new password.</p>
                </div>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:30px auto;">
                <tr>
                    <td align="center">
                    <a href="{{resetLink}}"
                        style="
                        display:inline-block;
                        background:linear-gradient(135deg,#10b981 0%,#059669 100%);
                        color:#ffffff;
                        text-decoration:none;
                        padding:18px 50px;
                        border-radius:10px;
                        font-size:17px;
                        font-weight:700;
                        text-align:center;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                        "
                    >
                        Reset Password
                    </a>
                    </td>
                </tr>
                </table>

                <p style="font-size:14px;color:#9ca3af;margin:25px 0 10px 0;">
                    This link will expire in <strong style="color:#10b981;">1 hour</strong> for security reasons.
                </p>
                
                <p style="font-size:14px;color:#9ca3af;margin:0;">
                    If you didn't request this password reset, you can safely ignore this email.
                </p>
                </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td class="section footer" bgcolor="#0e0f14" style="padding:35px 40px;background-color:#0e0f14;text-align:center;">
                        <div style="width:60px;height:2px;margin:20px auto;background:linear-gradient(90deg,rgba(16,185,129,0.8) 0%,transparent 100%);"></div>
                            <p style="font-size:13px;color:#94a3b8;margin:6px 0;">
                                <a href="{{unsubscribeUrl}}" style="color:#10b981;text-decoration:underline;">Unsubscribe</a> · 
                                <a href="https://marketpulse-taupe.vercel.app" style="color:#10b981;text-decoration:underline;">Visit MarketPulse</a>
                            </p>
                            <p style="font-size:13px;color:#94a3b8;margin:6px 0;">© 2026 MarketPulse</p>
                    </td>
                </tr>

                </table>

                </td>
            </tr>
        </table>
    </center>
</body>
</html>`;

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

export const sendPasswordResetEmail = async ({ email, resetLink, unsubscribeToken }: { email: string; resetLink: string; unsubscribeToken?: string }): Promise<void> => {
    console.log(`[DEBUG sendPasswordResetEmail] Starting email send to: ${email}`);
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://marketpulse-taupe.vercel.app";
    const unsubscribeUrl = unsubscribeToken 
        ? `${baseUrl}/api/unsubscribe?token=${unsubscribeToken}`
        : `${baseUrl}/unsubscribe`;

    const htmlTemplate = RESET_PASSWORD_EMAIL_TEMPLATE
        .replace('{{resetLink}}', resetLink)
        .replace(/href="{{unsubscribeUrl}}"/g, `href="${unsubscribeUrl}"`)
        .replace('{{unsubscribeUrl}}', unsubscribeUrl);

    const mailOptions = {
        from: `"MarketPulse" <marketpulse.dev@gmail.com>`,
        to: email,
        subject: "Reset Your MarketPulse Password 🔒",
        text: `Click the following link to reset your password: ${resetLink}`,
        html: htmlTemplate,
    };

    console.log(`[DEBUG sendPasswordResetEmail] Mail options prepared for: ${email}`);

    try {
        console.log(`[DEBUG sendPasswordResetEmail] Attempting to send email via nodemailer...`);
        const result = await transporter.sendMail(mailOptions);
        console.log(`[DEBUG sendPasswordResetEmail] Email sent successfully! MessageId: ${result.messageId}`);
    } catch (error: any) {
        console.error('[DEBUG sendPasswordResetEmail] Failed to send password reset email via nodemailer', {
            to: email,
            errorCode: error?.code,
            errorMessage: error?.message,
            errorResponse: error?.response,
            fullError: error,
        });
        throw new Error(`Failed to send password reset email: ${error?.message || 'Unknown error'}`);
    }
};
