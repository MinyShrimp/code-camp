# Day 2 - JS

## 문법

### 변수와 상수
변수 : 어떤 관계나 범위 안에서 여러가지 값으로 변할 수 있는 수
* `let`, `var`

상수 : 변하지 않은 값
* `const`

|        | var | let | const |
| :----: | :-: | :-: | :---: |
| 재선언 | ✅  | ❌  |  ❌   |
| 재할당 | ✅  | ✅  |  ❌   |

<b>작명 규칙</b>
|            |                       |
| ---------- | --------------------- |
| camelCase  | `let myMoney = 300;`  |
| snake_case | `let my_money = 300;` |

### 배열
```javascript
let students = ["길동", "철수", "영희", "준석"];
students.length;           // 4
students[0];               // '길동'
students.push("회민");     // 5
students.pop();            // '회민'
students.sort();           // ['길동', '영희', '준석', '철수']
students.includes("길동"); // True
students.includes("회민"); // False
students.concat(["a", "b"]);
```

### 객체
```js
const object = {
    key: value
};
```
```js
const profile = {
    name: "홍길동",
    age: 50,
    height: 165,
};
profile.name; // '홍길동'
profile['name']; // '홍길동'
```
```js
const students = [
    { name: "길동", pet: "강아지", house: "구로구" },
    { name: "철수", pet: "고양이", house: "관악구" },
    { name: "다희", pet: "미어캣", house: "강서구" },
];
console.log(students);
console.log(students[0].name); // 길동
console.log(students[0].pet);  // 강아지
```