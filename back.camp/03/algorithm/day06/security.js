// 문자열로 된 주민번호가 주어졌을 때 주민번호 뒷자리 7자리를 '*'로 변경해 주는 함수를 만들어주세요.

function securityNumber(str) {
    // padEnd 메서드와 substr 메서드를 사용해 보세요.
    const front = str.substr(0, 6);
    const back  = "".padStart(7, '*');

    return `${front}-${back}`;
}

let str = "991122-1111111";
console.log(securityNumber(str)); //'991122-*******'