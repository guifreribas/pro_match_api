import crypto from "crypto";

export function generateRandomToken(length) {
    return crypto.randomBytes(length).toString("hex");
}

export function extractFileName(path) {
    const regex = /[^\/]+$/;
    return path.match(regex)[0];
}

export function getTokenFromCookie(cookie) {
    const match = cookie.match(/token=([^;]+)/);
    return match ? match[1] : null;
}
