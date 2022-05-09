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

export function sendSMS(phoneNumber, token) {
    return {
        key: "api key",
        user_id: "host id",
        sender: "host phone number",
        receiver: phoneNumber,
        msg: token,
    };
}
