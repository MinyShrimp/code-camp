
/*
/code.camp/back.camp/03/homework/day01/resident-registration-number.js

주민번호 뒷자리를 가리는 함수(customRegistrationNumber)를 하나 만들고, 해당 함수에 “210510-1010101” 와 같이 주민번호를 넣어서 실행하면 “210510-1******” 와 같은 형태로 콘솔에 출력되도록 만들어 주세요.
1. 주민번호 가운데가 ”-”로 구성되어야 합니다. 
    - 그렇지 않을 경우 에러 메세지를 콘솔에 출력해 주세요.       
        ex) ”에러 발생!!! 형식이 올바르지 않습니다!!!”
        
2. 주민번호는 앞 6자리, 뒤 7자리로 구성되어야 합니다.
    - 그렇지 않을 경우 에러 메세지를 콘솔에 출력해 주세요.
        ex) ”에러 발생!!! 개수를 제대로 입력해 주세요!!!”
        
3. 뒤 7자리 중, 끝 6자리는 *로 변경해서 콘솔에 출력해 주세요.
4. 함수는 퍼사드 패턴이 적용되어야 합니다. 
    - 필요시 새로운 파일도 생성 가능합니다. - 파일명 자유
5. 함수에 “210510-1010101”, “210510-1010101010101”, “2105101010101”를 각각 넣어 실행했을 때 콘솔에 출력된 화면 캡쳐본과 `day01` ****폴더를 압축해 클래스룸에 제출해 주세요.
*/

import { checkVaildResidentNumber } from "./checks.js";

function transformSecretNumber( suffix ) {
    let tmp = [...suffix];
    for(let i = 1; i <= 6; i++) { tmp[i] = '*'; }
    return tmp.join('');
}

// 함수는 퍼사드 패턴이 적용되어야 합니다. 
function customRegistrationNumber( residentNumber ) {
    if( !checkVaildResidentNumber(residentNumber) ) {
        return ;
    }

    // 뒤 7자리 중, 끝 6자리는 *로 변경해서 콘솔에 출력해 주세요.
    const [prefix, suffix] = residentNumber.split('-');
    const secretSuffix = transformSecretNumber(suffix);

    const result = `${prefix}-${secretSuffix}`;

    console.log(result);
    return result;
}

// 함수에 “210510-1010101”, “210510-1010101010101”, “2105101010101”를 각각 넣어 실행
customRegistrationNumber('210510-1010101');
customRegistrationNumber('210510-1010101010101');
customRegistrationNumber('21051010101');