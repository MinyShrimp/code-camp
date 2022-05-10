// 숫자로 읽을 수 있는 문자열이 담긴 배열이 있습니다.
// 문자열을 숫자로 변환해 배열에 담을 수 있게 solution 함수를 완성해주세요.
// HINT : Number('1')

function solution(element, index, array) {
    return Number(element);
}

const arr = ['1', '2', '3'];

const result = arr.map(solution);

console.log(result); // [1, 2, 3]
