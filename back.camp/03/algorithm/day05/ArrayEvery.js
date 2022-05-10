// 배열의 모든 element가 숫자라면 true,
// 하나라도 숫자가 아니라면 false를 리턴하도록
// 콜백 함수 solution 함수를 완성하세요.
function solution(element, index, array) {
    return Number.isInteger(element); 
}

const result1 = [1, 2, 3, 4, 5].every(solution) 
console.log('result1', result1) // true

const result2 = [1, 2, 3, '4', 5].every(solution) 
console.log('result2', result2) // false