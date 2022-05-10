// 숫자로 이루어진 배열이 주어졌을때 제일 큰 수를 출력하는 함수를 만들어주세요.

function maxNum(nums) {
    // Math.max 메서드와 스프레드 문법을 사용해 보세요.
    let result = Math.max( ...nums );
    return result;
}

let arr = [100, 200, 400, 20, 10, 278, 488];

console.log(maxNum(arr)); // 488
