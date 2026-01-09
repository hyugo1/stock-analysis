export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Welcome Email</title>

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
        .date-badge {
        display: inline-block;
        margin-top: 12px;
        padding: 6px 16px;
        border-radius: 20px;
        background: rgba(16,185,129,0.1);
        border: 1px solid rgba(16,185,129,0.3);
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
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
        .news-heading {
        font-size: 22px;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 25px;
        }

        .news-card {
        background: #0f131d;
        border: 1px solid #1f2937;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 18px;
        }
        .news-meta {
        font-size: 11px;
        margin-bottom: 8px;
        }
        .news-title {
        font-size: 16px;
        font-weight: 600;
        color: #e5e7eb;
        margin-bottom: 10px;
        }
        .news-title a {
        color: #e5e7eb !important;
        text-decoration: none;
        }
        .news-summary {
        font-size: 14px;
        color: #9ca3af;
        line-height: 1.6;
        margin-bottom: 12px;
        }
        .news-cta {
        font-size: 13px;
        font-weight: 600;
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
        .news-heading { font-size: 20px; }
        .news-card { padding: 16px; }
        .news-title { font-size: 15px; }
        .news-summary { font-size: 13px; }
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
                <h1 style="font-size:28px;font-weight:700;color:#ffffff;margin:0 0 20px 0;">You're set up, {{name}}.</h1>
                <p style="font-size:16px;color:#94a3b8;margin:0 0 25px 0;">{{intro}}</p>

                <p style="font-size:18px;font-weight:600;color:#e5e7eb;margin:0 0 15px 0;">Get started in a few minutes:</p>
                <ul style="margin:0 0 30px 24px;padding:0;">
                    <li style="font-size:15px;color:#cbd5e1;margin-bottom:12px;">Build a watchlist to monitor the stocks that matter to you</li>
                    <li style="font-size:15px;color:#cbd5e1;margin-bottom:12px;">Set price and volume alerts to catch meaningful market moves</li>
                    <li style="font-size:15px;color:#cbd5e1;">Use the dashboard to track trends and key market developments</li>
                </ul>

                <p style="font-size:16px;color:#94a3b8;margin:0 0 25px 0;">We'll deliver timely updates and market signals — so you can focus on decisions, not distractions.</p>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:20px auto;">
                <tr>
                    <td align="center">
                    <a href="https://marketpulse-taupe.vercel.app"
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
                        Open Dashboard
                    </a>
                    </td>
                </tr>
                </table>
                </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td class="section footer" bgcolor="#0e0f14" style="padding:35px 40px;background-color:#0e0f14;text-align:center;">
                        <div style="width:60px;height:2px;margin:20px auto;background:linear-gradient(90deg,rgba(16,185,129,0.8) 0%,transparent 100%);"></div>
                            <p style="font-size:13px;color:#94a3b8;margin:6px 0;">
                                <a href="#" style="color:#10b981;text-decoration:underline;">Unsubscribe</a> · 
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

export const NEWS_SUMMARY_EMAIL_TEMPLATE = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Market News Summary</title>

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
    .date-badge {
    display: inline-block;
    margin-top: 12px;
    padding: 6px 16px;
    border-radius: 20px;
    background: rgba(16,185,129,0.1);
    border: 1px solid rgba(16,185,129,0.3);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
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
    .news-heading {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 25px;
    }

    .news-card {
    background: #0f131d;
    border: 1px solid #1f2937;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 18px;
    }
    .news-meta {
    font-size: 11px;
    margin-bottom: 8px;
    }
    .news-title {
    font-size: 16px;
    font-weight: 600;
    color: #e5e7eb;
    margin-bottom: 10px;
    }
    .news-title a {
    color: #e5e7eb !important;
    text-decoration: none;
    }
    .news-summary {
    font-size: 14px;
    color: #9ca3af;
    line-height: 1.6;
    margin-bottom: 12px;
    }
    .news-cta {
    font-size: 13px;
    font-weight: 600;
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
    .news-heading { font-size: 20px; }
    .news-card { padding: 16px; }
    .news-title { font-size: 15px; }
    .news-summary { font-size: 13px; }
    }
    </style>
</head>

<body style="margin:0;padding:0;background-color:#0e0f14;font-family:'Segoe UI',sans-serif;">
    <center>
        <table role="presentation" width="100%" bgcolor="#0e0f14" style="background-color:#0e0f14;">
            <tr>
                <td align="center" style="padding:40px 10px; background-color:#0e0f14;" bgcolor="#0e0f14">

                <table role="presentation" class="email-wrapper" bgcolor="#0e1116" style="background-color:#0e1116;">

                <!-- Header -->
                <tr>
                <td class="section header" bgcolor="#0e0f14" style="background-color:#0e0f14;">
                <span class="logo">MARKET<span class="neon">PULSE</span></span><br>
                <span class="date-badge neon">{{date}}</span>
                </td>
                </tr>

                <!-- Content -->
                <tr>
                <td class="section content" bgcolor="#0a0a10" style="background-color:#0a0a10;">
                <p class="section-label neon">Today's Headlines</p>
                <h1 class="news-heading">Market News Summary</h1>

                {{newsContent}}

                </td>
                </tr>

                <!-- Footer -->
                <tr>
                <td class="section footer" bgcolor="#0e0f14" style="background-color:#0e0f14;">
                <div class="footer-divider"></div>
                <p class="footer-text">You're receiving this because you subscribed to MarketPulse news updates.</p>
                <p class="footer-text">
                    <a href="https://marketpulse-taupe.vercel.app/news" class="neon-link">View more news →</a>
                </p>
                <p class="footer-text">
                    <a href="#" class="neon-link">Unsubscribe</a> ·
                    <a href="https://marketpulse-taupe.vercel.app" class="neon-link">Visit MarketPulse</a>
                </p>
                <p class="footer-text">© 2026 MarketPulse</p>
                </td>
                </tr>

                </table>

                </td>
            </tr>
        </table>
    </center>
</body>
</html>`;

