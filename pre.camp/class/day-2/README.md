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
students.length           // 4
students[0]               // '길동'
students.push("회민");    // 5
students.pop();           // '회민'
students.sort();          // ['길동', '영희', '준석', '철수']
students.includes("길동") // True
students.includes("회민") // False
```