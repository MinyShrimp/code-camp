
// param check
function checkParam( param ) {
    if( param === undefined ) {
        console.log(`”에러 발생!!! 주민번호가 입력되지 않았습니다.”`);
        return false;
    }
    return true;
}

// 주민번호 가운데가 ”-”로 구성되어야 합니다. 
function checkSuffix( suffix ) {
    if( suffix === undefined ) {
        console.log(`”에러 발생!!! 형식이 올바르지 않습니다!!!”`);
        return false;
    }
    return true;
}

// 주민번호는 앞 6자리, 뒤 7자리로 구성되어야 합니다.
function checkLength( prefix, suffix ) {
    if( prefix.length !== 6 || suffix.length !== 7 ) {
        console.log(`”에러 발생!!! 개수를 제대로 입력해 주세요!!!”`);
        return false;
    }
    return true;
}

export function checkVaildResidentNumber( residentNumber ) {
    if( !checkParam( residentNumber ) ) {
        return false;
    }

    let [prefix, suffix] = residentNumber.split('-');
    if( !checkSuffix(suffix) || !checkLength(prefix, suffix) ) {
        return false;
    }

    return true;
}