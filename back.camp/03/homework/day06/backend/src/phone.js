import coolsms from "coolsms-node-sdk";

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
