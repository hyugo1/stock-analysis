import crypto from "crypto";

const UNSUBSCRIBE_SECRET = process.env.UNSUBSCRIBE_SECRET || "default-unsubscribe-secret";

export const generateUnsubscribeToken = (email: string): string => {
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const payload = `${email}:${expires}`;
    const signature = crypto
        .createHmac("sha256", UNSUBSCRIBE_SECRET)
        .update(payload)
        .digest("hex");
    return Buffer.from(`${payload}:${signature}`).toString("base64");
};

export const verifyUnsubscribeToken = (token: string): { email: string; valid: boolean } => {
    try {
        const decoded = Buffer.from(token, "base64").toString("utf-8");
        const [email, expires, signature] = decoded.split(":");
        
        if (Date.now() > parseInt(expires)) {
            return { email: "", valid: false };
        }
        
        const expectedSignature = crypto
            .createHmac("sha256", UNSUBSCRIBE_SECRET)
            .update(`${email}:${expires}`)
            .digest("hex");
            
        if (signature !== expectedSignature) {
            return { email: "", valid: false };
        }
        
        return { email, valid: true };
    } catch {
        return { email: "", valid: false };
    }
};