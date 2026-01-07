export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Welcome to MarketPulse</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }
        
        /* Main styles */
        .email-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .header-section {
            padding: 40px 40px 30px 40px;
            background: linear-gradient(180deg, #1a1f2e 0%, #0f1218 100%);
            border-radius: 12px 12px 0 0;
        }
        
        .logo-text {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 1px;
        }
        
        .logo-accent {
            color: #10b981;
        }
        
        .hero-section {
            padding: 30px 40px;
            background-color: #1a1f2e;
            text-align: center;
        }
        
        .hero-image {
            width: 100%;
            max-width: 520px;
            height: auto;
            border-radius: 8px;
            border: 1px solid #2d3548;
        }
        
        .content-section {
            padding: 40px;
            background-color: #0f1218;
        }
        
        .welcome-heading {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 25px 0;
            line-height: 1.3;
        }
        
        .welcome-subheading {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 16px;
            color: #94a3b8;
            margin: 0 0 30px 0;
            line-height: 1.6;
        }
        
        .section-title {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: #e2e8f0;
            margin: 0 0 20px 0;
        }
        
        .feature-list {
            margin: 0 0 35px 0;
            padding: 0 0 0 24px;
        }
        
        .feature-item {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 15px;
            color: #cbd5e1;
            margin: 0 0 15px 0;
            line-height: 1.5;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%);
            color: #f8fafc !important;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            border: 1px solid #334155;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.4);
        }
        
        .footer-section {
            padding: 40px;
            background-color: #0a0d12;
            text-align: center;
            border-radius: 0 0 12px 12px;
        }
        
        .footer-text {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 13px;
            color: #64748b;
            margin: 0 0 8px 0;
            line-height: 1.6;
        }
        
        .footer-link {
            color: #64748b !important;
            text-decoration: underline;
        }
        
        .footer-divider {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, #10b981 0%, transparent 100%);
            margin: 25px auto;
        }
        
        /* Mobile responsive */
        @media only screen and (max-width: 600px) {
            .email-wrapper {
                width: 100% !important;
            }
            .header-section, .hero-section, .content-section, .footer-section {
                padding: 25px 20px !important;
            }
            .welcome-heading {
                font-size: 24px !important;
            }
            .welcome-subheading, .feature-item {
                font-size: 14px !important;
            }
            .hero-image {
                max-width: 100% !important;
                padding: 0 10px !important;
            }
            .cta-button {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050a12; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
    <center style="width: 100%; background-color: #050a12;">
        <!-- Preheader -->
        <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
            Welcome to MarketPulse! Let's get you started with your stock analysis journey.
        </div>
        
        <!-- Main Email Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050a12;">
            <tr>
                <td align="center" style="padding: 40px 15px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="email-wrapper" style="max-width: 600px; background-color: #0f1218; border-radius: 12px; overflow: hidden;">
                        
                        <!-- Header Section -->
                        <tr>
                            <td class="header-section" style="padding: 40px 40px 30px 40px; background: linear-gradient(180deg, #1a1f2e 0%, #0f1218 100%);">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td align="left">
                                            <!-- Logo as Text -->
                                            <span style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 26px; font-weight: 700; color: #e2e8f0; letter-spacing: 1px;">
                                                MARKET<span style="color: #10b981;">PULSE</span>
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Hero Image Section -->
                        <tr>
                            <td class="hero-section" style="padding: 30px 40px; background-color: #1a1f2e; text-align: center;">
                                <img src="/assets/images/stockdashboard.png" alt="MarketPulse Dashboard Preview" class="hero-image" style="width: 100%; max-width: 520px; height: auto; border-radius: 8px; border: 1px solid #2d3548;">
                            </td>
                        </tr>
                        
                        <!-- Content Section -->
                        <tr>
                            <td class="content-section" style="padding: 40px; background-color: #0f1218;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    
                                    <!-- Welcome Message -->
                                    <tr>
                                        <td style="padding-bottom: 25px;">
                                            <h1 class="welcome-heading" style="margin: 0 0 15px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                                                Welcome aboard, {{name}}!
                                            </h1>
                                            <p class="welcome-subheading" style="margin: 0; font-size: 16px; color: #94a3b8; line-height: 1.6;">
                                                {{intro}}
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Divider -->
                                    <tr>
                                        <td style="padding: 20px 0;">
                                            <div style="width: 100%; height: 1px; background: linear-gradient(90deg, #2d3548 0%, transparent 100%);"></div>
                                        </td>
                                    </tr>
                                    
                                    <!-- Features Section -->
                                    <tr>
                                        <td style="padding: 10px 0 30px 0;">
                                            <p style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #e2e8f0;">
                                                Here's what you can do right now:
                                            </p>
                                            <ul class="feature-list" style="margin: 0; padding: 0 0 0 24px;">
                                                <li class="feature-item" style="margin: 0 0 15px 0; font-size: 15px; color: #cbd5e1; line-height: 1.5;">
                                                    Set up your watchlist to follow your favorite stocks
                                                </li>
                                                <li class="feature-item" style="margin: 0 0 15px 0; font-size: 15px; color: #cbd5e1; line-height: 1.5;">
                                                    Create price and volume alerts so you never miss a move
                                                </li>
                                                <li class="feature-item" style="margin: 0; font-size: 15px; color: #cbd5e1; line-height: 1.5;">
                                                    Explore the dashboard for trends and the latest market news
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    
                                    <!-- Closing Message -->
                                    <tr>
                                        <td style="padding: 10px 0 35px 0;">
                                            <p class="welcome-subheading" style="margin: 0; font-size: 16px; color: #94a3b8; line-height: 1.6;">
                                                We'll keep you informed with timely updates, insights, and alerts — so you can focus on making the right calls.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- CTA Button -->
                                    <tr>
                                        <td align="center" style="padding: 10px 0;">
                                            <a href="https://marketpulse-taupe.vercel.app" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                                                Go to Dashboard
                                            </a>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer Section -->
                        <tr>
                            <td class="footer-section" style="padding: 40px; background-color: #0a0d12; text-align: center; border-radius: 0 0 12px 12px;">
                                <div class="footer-divider" style="width: 60px; height: 2px; background: linear-gradient(90deg, #10b981 0%, transparent 100%); margin: 25px auto;"></div>
                                <p class="footer-text" style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">
                                    <a href="#" class="footer-link" style="color: #64748b; text-decoration: underline;">Unsubscribe</a> 
                                    &nbsp;|&nbsp; 
                                    <a href="https://marketpulse-taupe.vercel.app" class="footer-link" style="color: #64748b; text-decoration: underline;">Visit MarketPulse</a>
                                </p>
                                <p class="footer-text" style="margin: 0; font-size: 13px; color: #64748b;">
                                    © 2026 MarketPulse
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`;

export const NEWS_SUMMARY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Market News Summary</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }
        
        /* Main styles */
        .email-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .header-section {
            padding: 35px 40px;
            background: linear-gradient(180deg, #1a1f2e 0%, #0f1218 100%);
            border-radius: 12px 12px 0 0;
        }
        
        .logo-text {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 22px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 1px;
        }
        
        .logo-accent {
            color: #10b981;
        }
        
        .date-badge {
            display: inline-block;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 20px;
            padding: 6px 16px;
            margin-top: 15px;
        }
        
        .date-text {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 13px;
            color: #10b981;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .content-section {
            padding: 35px 40px;
            background-color: #0f1218;
        }
        
        .section-label {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 12px;
            font-weight: 600;
            color: #10b981;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 0 8px 0;
        }
        
        .news-heading {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 22px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 30px 0;
            line-height: 1.3;
        }
        
        .news-card {
            background-color: #1a1f2e;
            border: 1px solid #2d3548;
            border-radius: 10px;
            padding: 24px;
            margin-bottom: 20px;
            transition: border-color 0.2s ease;
        }
        
        .news-card:last-child {
            margin-bottom: 0;
        }
        
        .news-card:hover {
            border-color: #10b981;
        }
        
        .news-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }
        
        .ticker-badge {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: #10b981;
            background: rgba(16, 185, 129, 0.1);
            padding: 4px 10px;
            border-radius: 4px;
            letter-spacing: 0.5px;
        }
        
        .source-text {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 12px;
            color: #64748b;
        }
        
        .news-title {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: #e2e8f0;
            margin: 0 0 12px 0;
            line-height: 1.4;
        }
        
        .news-title a {
            color: #e2e8f0 !important;
            text-decoration: none;
        }
        
        .news-title a:hover {
            color: #10b981 !important;
        }
        
        .news-summary {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 14px;
            color: #94a3b8;
            margin: 0 0 15px 0;
            line-height: 1.6;
        }
        
        .news-cta {
            display: inline-block;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #10b981;
            text-decoration: none;
        }
        
        .news-cta:hover {
            text-decoration: underline;
        }
        
        .news-cta-arrow {
            display: inline-block;
            margin-left: 4px;
            transition: transform 0.2s ease;
        }
        
        .news-card:hover .news-cta-arrow {
            transform: translateX(3px);
        }
        
        .footer-section {
            padding: 35px 40px;
            background-color: #0a0d12;
            text-align: center;
            border-radius: 0 0 12px 12px;
        }
        
        .footer-text {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            font-size: 13px;
            color: #64748b;
            margin: 0 0 8px 0;
            line-height: 1.6;
        }
        
        .footer-link {
            color: #64748b !important;
            text-decoration: underline;
        }
        
        .footer-divider {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, #10b981 0%, transparent 100%);
            margin: 25px auto;
        }
        
        /* Mobile responsive */
        @media only screen and (max-width: 600px) {
            .email-wrapper {
                width: 100% !important;
            }
            .header-section, .content-section, .footer-section {
                padding: 25px 20px !important;
            }
            .news-heading {
                font-size: 20px !important;
            }
            .news-card {
                padding: 18px !important;
            }
            .news-title {
                font-size: 15px !important;
            }
            .news-summary {
                font-size: 13px !important;
            }
            .logo-text {
                font-size: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050a12; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
    <center style="width: 100%; background-color: #050a12;">
        <!-- Preheader -->
        <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
            Your daily market news summary is here. Stay informed with the latest stock market updates.
        </div>
        
        <!-- Main Email Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050a12;">
            <tr>
                <td align="center" style="padding: 40px 15px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="email-wrapper" style="max-width: 600px; background-color: #0f1218; border-radius: 12px; overflow: hidden;">
                        
                        <!-- Header Section -->
                        <tr>
                            <td class="header-section" style="padding: 35px 40px; background: linear-gradient(180deg, #1a1f2e 0%, #0f1218 100%);">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td align="left">
                                            <!-- Logo as Text -->
                                            <span style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 24px; font-weight: 700; color: #e2e8f0; letter-spacing: 1px;">
                                                MARKET<span style="color: #10b981;">PULSE</span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left">
                                            <!-- Date Badge -->
                                            <div class="date-badge" style="display: inline-block; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 20px; padding: 6px 16px; margin-top: 15px;">
                                                <span class="date-text" style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 12px; font-weight: 600; color: #10b981; text-transform: uppercase; letter-spacing: 0.5px;">
                                                    {{date}}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Content Section -->
                        <tr>
                            <td class="content-section" style="padding: 35px 40px; background-color: #0f1218;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    
                                    <!-- Section Label -->
                                    <tr>
                                        <td style="padding-bottom: 8px;">
                                            <p class="section-label" style="margin: 0; font-size: 12px; font-weight: 600; color: #10b981; text-transform: uppercase; letter-spacing: 1px;">
                                                Today's Headlines
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- News Heading -->
                                    <tr>
                                        <td style="padding-bottom: 30px;">
                                            <h1 class="news-heading" style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                                                Market News Summary
                                            </h1>
                                        </td>
                                    </tr>
                                    
                                    <!-- News Cards Container -->
                                    <tr>
                                        <td style="padding: 0;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f1218;">
                                                <tr>
                                                    <td style="padding: 0;">
                                                        {{newsContent}}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer Section -->
                        <tr>
                            <td class="footer-section" style="padding: 35px 40px; background-color: #0a0d12; text-align: center; border-radius: 0 0 12px 12px;">
                                <div class="footer-divider" style="width: 60px; height: 2px; background: linear-gradient(90deg, #10b981 0%, transparent 100%); margin: 25px auto;"></div>
                                <p class="footer-text" style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">
                                    You're receiving this because you subscribed to MarketPulse news updates.
                                </p>
                                <p class="footer-text" style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">
                                    <a href="https://marketpulse-taupe.vercel.app/news" class="footer-link" style="color: #10b981; text-decoration: none;">View more news on our website →</a>
                                </p>
                                <p class="footer-text" style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">
                                    <a href="#" class="footer-link" style="color: #64748b; text-decoration: underline;">Unsubscribe</a> 
                                    &nbsp;|&nbsp; 
                                    <a href="https://marketpulse-taupe.vercel.app" class="footer-link" style="color: #64748b; text-decoration: underline;">Visit MarketPulse</a>
                                </p>
                                <p class="footer-text" style="margin: 0; font-size: 13px; color: #64748b;">
                                    © 2026 MarketPulse
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`;

