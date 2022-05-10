// 주어진 배열에서 짝수인 요소만 걸러
// 새로운 배열에 담도록 solution 함수를 완성해주세요.
function solution(element, index, array) {
    return element % 2 === 0;
}

const arr = [1, 2, 3, 4, 5, 6];

const result = arr.filter(solution);

console.log(result); // [2, 4, 6]
