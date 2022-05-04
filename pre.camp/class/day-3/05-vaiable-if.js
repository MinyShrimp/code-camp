/*
조건문을 활용하여,
철수의 나이가 20세 이상이면 "성인입니다",
8세 이상 ~ 19세 이하면 "학생입니다",
7세 이하면 "어린이입니다."를
console.log를 활용하여 나타내어 보시오.
*/
const profile = {
    name: "철수",
    age: 12,
    school: "다람쥐초등학교"
};

if( profile.age >= 20 ) {
    console.log('성인입니다.');
} else if( profile.age >= 8 ) {
    console.log('학생입니다.');
} else {
    console.log('어린이입니다.');
}