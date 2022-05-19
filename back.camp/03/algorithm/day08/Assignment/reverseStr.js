//assignment

const upToLowAndLowToUp = ( char ) => {
    const ascii = char.charCodeAt();
    if( ascii >= 65 && ascii <= 90 ) {
        return ascii + 32;
    } else if( ascii >= 97 && ascii <= 122 ) {
        return ascii - 32;
    }
}

// const reverseStr = (list) => list.reverse().map(str => String.fromCharCode(...[...str].map(c => upToLowAndLowToUp(c)))).join(' ');
const reverseStr = (list) => {
    // 아래에 코드를 작성해주세요.
    let answer = list.reverse();
    for(let i = 0; i < answer.length; i++) {
        // const str         = answer[i];
        // const stringArr   = [...str];
        // const asciiArr    = stringArr.map(v => upToLowAndLowToUp(v));
        // const convert_str = String.fromCharCode( ...asciiArr );
        // answer[i]         = convert_str;
        answer[i] = String.fromCharCode(...[...answer[i]].map(v => upToLowAndLowToUp(v)));
    }
    return answer.join(' ');
};

// 아래의 코드는 절대로 수정하거나 삭제하지 마세요.
module.exports = reverseStr;
