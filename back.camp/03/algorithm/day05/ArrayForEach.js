// 배열의 요소가 짝수인 경우 count에 1을 더해,
// 최종적으로 짝수의 갯수와 count의 값이 같도록
// solution 함수를 완성해주세요.

let count = 0;

function solution(element, index, array) {
    if( element % 2 === 0 ) { count += 1; }
}

const arr = [1, 2, 3, 4, 5];

arr.forEach(solution);

console.log(count); // 2
