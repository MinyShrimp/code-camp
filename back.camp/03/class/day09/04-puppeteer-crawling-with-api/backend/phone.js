// import { CoolSMSConfig } from "../00-config/config.js";
import coolsms from "coolsms-node-sdk";
import dotenv from "dotenv";

function getRandomInterger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomToken(digit) {
    if (digit === undefined) {
        console.error("Undefined Digit");
        return undefined;
    } else if (Number.isNaN(Number(digit))) {
        console.error("NaN Digit");
        return undefined;
    } else if (digit <= 0) {
        console.error("Minimum Digit is 1");
        return undefined;
    } else if (digit > 10) {
        console.error("Maximum Digit is 10");
        return undefined;
    }

    return String(getRandomInterger(0, Math.pow(10, digit))).padStart(digit, "0");
}

export function isValidPhoneNumber(phoneNumber) {
    const phoneNumberLen = String(phoneNumber).length;
    return phoneNumberLen >= 10 && phoneNumberLen <= 11;
}

export async function sendSMS(phoneNumber, token) {
    const msgService = new coolsms.default(process.env.COOL_SMS_KEY, process.env.COOL_SMS_SECRET);

    try {
        const res = await msgService.sendOne({
            to: phoneNumber,
            from: process.env.COOL_SMS_HOST_PHONE,
            text: `[코드캠프] 인증번호 : ${token}`
        });
        console.log(res);
        return res.statusCode === '2000';
    } catch(e) {
        console.log(e);
        return false;
    }
}
