import coolsms from "coolsms-node-sdk";

// min ~ (max - 1) 까지의 무작위 정수 반환
function getRandomInterger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// 1 ~ 10 자리의 랜덤한 토큰 생성
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

// 핸드폰 번호 확인
// 길이가 10 ~ 11 이면 허용
export function isValidPhoneNumber(phoneNumber) {
    const phoneNumberLen = String(phoneNumber).length;
    return phoneNumberLen >= 10 && phoneNumberLen <= 11;
}

// 문자메세지를 보냄
export async function sendSMS(phoneNumber, token) {
    const msgService = new coolsms.default(process.env.SMS_KEY, process.env.SMS_SECRET);

    try {
        const res = await msgService.sendOne({
            to: phoneNumber,
            from: process.env.SMS_SENDER,
            text: `[코드캠프] 인증번호 : ${token}`
        });
        return res.statusCode === '2000';
    } catch(e) {
        console.log(e);
        return false;
    }
}
