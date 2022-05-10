// arr 배열의 총합을 반환하는 함수를 만들어주세요
let arr = [14, 36, 43, 64, 88, 97];

function sum(arr) {
    // reduce 메서드를 사용해 주세요.
    return arr.reduce((prev, curr) => prev + curr);
}
console.log(sum(arr)); // 342
