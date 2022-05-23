import coolsms from "coolsms-node-sdk";

class PhoneService {
    constructor() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Utils => Controller
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * min ~ (max - 1) 까지의 무작위 정수 반환
     * @param {number} min 
     * @param {number} max 
     * @returns number
     */
    getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * 1 ~ 10 자리의 랜덤한 토큰 생성
     * @param {number} digit 
     * @returns string
     */
    getRandomToken = (digit) => {
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

        return String(this.getRandomInteger(0, 10 ** digit)).padStart(digit, "0");
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Controller => CoolSMS
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * CoolSMS 를 이용해 문자 메세지 보냄
     * 
     * @param {string} phoneNumber 
     * @param {string} token 
     * @returns Boolean
     */
    sendSMS = async (phoneNumber, token) => {
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

}

export default PhoneService;