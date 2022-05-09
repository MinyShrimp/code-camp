// 배열 numbers에 5가 있는지 find 함수를 이용해 찾아주세요.

const numbers = [1, 2, 3, 4, 5];

function callBackFn(ele, idx, arr) {
  // 배열의 요소가 5일 때 true를 리턴하도록 작성해주세요.
  return ele === 5;
}

let result = numbers.find(callBackFn);
console.log("결과", result); // 5
