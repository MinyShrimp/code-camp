
function getRandomInterger( min, max ) {
    return Math.floor( Math.random() * ( max - min ) + min );
}

function getRandomToken( digit ) {
    if( digit === undefined ) {
        console.error( "Undefined Digit" );
        return undefined;
    } else if( Number.isNaN( Number(digit) ) ) {
        console.error( "NaN Digit" );
        return undefined;
    } else if( digit <= 0 ) {
        console.error( "Minimum Digit is 1" );
        return undefined;
    } else if( digit > 10 ) {
        console.error( "Maximum Digit is 10" );
        return undefined;
    }

    return String( getRandomInterger(0, Math.pow(10, digit)) ).padStart(digit, "0");
}

function isValidPhoneNumber( phoneNumber ) {
    phoneNumberLen = String(phoneNumber).length;
    return phoneNumberLen >= 10 && phoneNumberLen <= 11;
}

function createTokenOfPhone( phoneNumber ) {
    // 1. 핸드폰 번호가 10 ~ 11 자리인지 검증
    if( !isValidPhoneNumber( phoneNumber) ) {
        return undefined;
    }

    // 2. 토큰 생성
    const token = getRandomToken( 6 );

    // 3. 토큰을 핸드폰에 전송 
    return { key: "api key", user_id: "host id", sender: "host phone number", receiver: phoneNumber, msg: token };
}

console.log( createTokenOfPhone("12345678901") );