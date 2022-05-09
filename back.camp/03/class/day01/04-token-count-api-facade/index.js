console.log("안녕하세요~~");

function checkValidationPhone(myphone) {
    if (myphone.length !== 10 && myphone.length !== 11) {
        console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
        return false;
    } else {
        return true;
    }
}

function getToken(digit) {
    if (digit === undefined) {
        console.log("에러 발생!!! 갯수를 제대로 입력해 주세요!!!");
        return;
    } else if (digit <= 0) {
        console.log("에러 발생!!! 갯수가 너무 적습니다!!!");
        return;
    } else if (digit > 10) {
        console.log("에러 발생!!! 갯수가 너무 많습니다!!!");
        return;
    }
    const result = String(Math.floor(Math.random() * 10 ** digit)).padStart(digit, "0");
    return result;
    // console.log(result)
}

function sendTokenToSMS(phoneNumber, msg) {
    const response = {
        key: 'api key',
        user_id: "host id",
        sender: "host phone number",
        receiver: phoneNumber,
        msg: msg
    };
    console.log(response);
}

function createTokenOfPhone(myphone) {
    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone);
    if (isValid) {
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken( 6 );

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, mytoken);
    }
}

createTokenOfPhone("01012345678");
