import { getRandomToken, isValidPhoneNumber, sendSMS } from "./phone.js";

function createTokenOfPhone( phoneNumber ) {
    // 1. 핸드폰 번호가 10 ~ 11 자리인지 검증
    if( !isValidPhoneNumber( phoneNumber) ) {
        return undefined;
    }

    // 2. 토큰 생성
    const token = getRandomToken( 6 );

    // 3. 토큰을 핸드폰에 전송 
    return sendSMS(phoneNumber, token);
}

console.log( createTokenOfPhone("12345678901") );