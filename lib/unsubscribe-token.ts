import crypto from "crypto";

const UNSUBSCRIBE_SECRET = process.env.UNSUBSCRIBE_SECRET;

if (!UNSUBSCRIBE_SECRET) {
    throw new Error("UNSUBSCRIBE_SECRET environment variable must be set");
}

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
        const parts = decoded.split(":");
        if (parts.length !== 3) {
            return { email: "", valid: false };
        }
        const [email, expires, signature] = parts;
        
        const expiresNum = parseInt(expires, 10);
        if (isNaN(expiresNum) || Date.now() > expiresNum) {
            return { email: "", valid: false };
        }
        
        const expectedSignature = crypto
            .createHmac("sha256", UNSUBSCRIBE_SECRET)
            .update(`${email}:${expires}`)
            .digest("hex");
            
        const signatureBuffer = Buffer.from(signature, 'hex');
        const expectedBuffer = Buffer.from(expectedSignature, 'hex');
        
        if (signatureBuffer.length !== expectedBuffer.length || 
            !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
            return { email: "", valid: false };
        }
        
        return { email, valid: true };
    } catch {
        return { email: "", valid: false };
    }
};