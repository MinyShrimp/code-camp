
let _name;
_name = "김회민"; // 김회민
_name = "홍길동"; // 홍길동

const _money = 0;
// _money = 100; // error

console.log(_name, _money);

/* *************************** */

const classmates = [
    "김회민", "오세훈", "김철수"
];

classmates.length; // 3
classmates[0]; // '김회민'
classmates[3]; // undefined
classmates.push('영희'); // 4
classmates.pop(); // '영희'
classmates.sort(); // [ "김철수", "김회민", "오세훈" ]
classmates.includes("길동"); // false

/* *************************** */

const developer = [
    "1. 열정", "4. 오픈 마인드", "2. 오류 대처(디버깅)", "3. 설계 능력", "5. 검색 능력"
];

console.log(developer[0]);
console.log(developer[2]);
console.log(developer[3]);
console.log(developer[1]);
console.log(developer[4]);

developer.sort();