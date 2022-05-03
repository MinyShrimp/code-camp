
let _name;
_name = "김회민"; // 김회민
_name = "홍길동"; // 홍길동

const _money = 0;
// _money = 100; // error

console.log(_name, _money);

/* *************************** */

console.log('---------------------------------');

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

console.log('---------------------------------');

/* *************************** */

console.log('---------------------------------');

let developer = [
    "1. 열정", "4. 오픈 마인드", "2. 오류 대처(디버깅)", "3. 설계 능력", "5. 검색 능력"
];

console.log(developer[0]);
console.log(developer[2]);
console.log(developer[3]);
console.log(developer[1]);
console.log(developer[4]);

console.log('---------------------------------');

let dream = [
    "커리어 점프", "성공", "할 수 있다"
];

const result_1 = [...developer, ...dream];
const result_2 = developer.concat(dream);

console.log(result_1);
console.log(result_2);

console.log('---------------------------------');

/* *************************** */

const email = "codecamp@gmail.com";
if( email.includes('@') ) {
    let   _email    = email.split('@');
    const _id       = _email[0];
    let   maskingId = [];

    for( let i = 0; i < _id.length; i++ ) {
        maskingId.push( i < 4 ? _id[i] : '*' );
    }

    _email[0] = maskingId.join('');
    console.log(_email.join('@'));
}

/* *************************** */

console.log('---------------------------------');

const student = {
    name: "김회민",
    age: 26,
    camp: "코드캠프"
};
console.log(student);
console.log(student.name);   // 김회민
console.log(student.age);    // 26
console.log(student.camp);   // 코드캠프
console.log(student.school); // undefined

console.log('---------------------------------');

const classmates_2 = [
    {name: "철수", age: 13, school: "다람쥐초등학교"},
    {name: "영희", age:  8, school:   "공룡초등학교"},
    {name: "훈이", age: 11, school: "거북이초등학교"},
];
console.log(classmates_2);
console.log(classmates_2.length);    // 4
console.log(classmates_2[0]);        // {name: "철수", age: 13, school: "다람쥐초등학교"}
console.log(classmates_2[0].age);    // 13
console.log(classmates_2[2].school); // "거북이초등학교"

console.log('---------------------------------');

/* *************************** */

const fruits = [
    { number:  1, title: "레드향"},
    { number:  2, title: "샤인머스켓"},
    { number:  3, title: "산청딸기"},
    { number:  4, title: "한라봉"},
    { number:  5, title: "사과"},
    { number:  6, title: "애플망고"},
    { number:  7, title: "딸기"},
    { number:  8, title: "천혜향"},
    { number:  9, title: "과일선물세트"},
    { number: 10, title: "귤"},
];

console.log('---------------------------------');

console.log( fruits[0].number + ' ' + fruits[0].title );
console.log( fruits[1].number + ' ' + fruits[1].title );
console.log( fruits[2].number + ' ' + fruits[2].title );
console.log( fruits[3].number + ' ' + fruits[3].title );
console.log( fruits[4].number + ' ' + fruits[4].title );
console.log( fruits[5].number + ' ' + fruits[5].title );
console.log( fruits[6].number + ' ' + fruits[6].title );
console.log( fruits[7].number + ' ' + fruits[7].title );
console.log( fruits[8].number + ' ' + fruits[8].title );
console.log( fruits[9].number + ' ' + fruits[9].title );

console.log('---------------------------------');

fruits.forEach(v => {
    console.log(v.number + ' ' + v.title);
});

console.log('---------------------------------');

/* *************************** */

