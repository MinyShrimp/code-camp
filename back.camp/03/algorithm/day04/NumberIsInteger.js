/*
  어떤 숫자 num이 주어졌을 때, 
  Number.isInteger()를 이용해
  정수라면 그대로 두고,
  실수라면  Math.ceil()을 이용해 올림을 해주는 함수 solution을 완성해주세요.
*/
function solution(num) {
    // if( !Number.isInteger( num ) ) {
    //     return Math.ceil(num);
    // } else {
    //     return num;
    // }
    return Number.isInteger( num ) ? num : Math.ceil(num);
}

console.log(solution(3)); // 3
console.log(solution(3.3)); // 4
