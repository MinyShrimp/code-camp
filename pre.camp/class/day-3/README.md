# Day 3 - JS

# OT
## 웹앱 서비스 기본구조
> FrontEnd -(Request)-> BackEnd -> DB -> BackEnd -(Response)-> FrontEnd

![](../../pictures/WebAppServiceFrame.png)

# JS
## 연산자
### 산술연산자
> Return 값 = int or float

|     |        |     |        |
| --- | ------ | --- | ------ |
| +   | 더하기 | -   | 빼기   |
| *   | 곱하기 | ^   | 제곱   |
| /   | 나누기 | %   | 나머지 |
| ++  | 1증가  | --  | 1감소  |

```js
10 + 1 = 11
10 + '1' = '101'
10 + '만원' = '10만원'

10 - 1 = 9
10 - '1' = 9
10 - '만원' = NaN

10 * 10 = 100
10 * '10' = 100
10 * '만원' = NaN
```

### 대입연산자
|     |               |              |             |
| --- | ------------- | ------------ | ----------- |
| =   | 대입          | `let i = 0;` |             |
| +=  | 증가하고 대입 | `i += 1`     | `i = i + 1` |
| -=  | 감소하고 대입 | `i -= 1`     | `i = i - 1` |
| *=  | 곱하고 대입   | `i *= 2`     | `i = i * 2` |
| /=  | 나누고 대입   | `i /= 2`     | `i = i / 2` |
| %=  | 나머지를 대입 | `i %= 2`     | `i = i % 2` |

### 비교연산자
> Return 값 = Boolean

|     |      |     |        |
| --- | ---- | --- | ------ |
| <   | 미만 | >   | 초과   |
| <=  | 이하 | >=  | 이상   |
| === | 같다 | !== | 다르다 |
| ==  | 같다 | !=  | 다르다 |

| 느슨한 비교연산자  | 엄격한 비교연산자             |
| ------------------ | ----------------------------- |
| ==                 | ===                           |
| 값만 같으면 True   | 값과 데이터형식이 같아야 True |
| `1 == '1' // True` | `1 === '1' // False`          |
> 가급적이면 `===` 을 사용하자.

### 논리연산자

|      |     |          |                                                        |
| ---- | --- | -------- | ------------------------------------------------------ |
| &&   | AND | A && B   | 양쪽이 모두 True이면 True를 반환                       |
| \|\| | OR  | A \|\| B | 한쪽만 True여도 True를 반환                            |
| !    | NOT | !A       | True면 False, False면 True를 반환                      |
| ??   |     | A ?? B   | 왼쪽 값이 undefined면 오른쪽 값, 아니면 왼쪽 값을 반환 |

<b>AND(&&)</b>
| Value1 | Value2 | Result |
| ------ | ------ | ------ |
| False  | False  | False  |
| False  | True   | False  |
| True   | False  | False  |
| True   | True   | True   |

<b>OR(||)</b>
| Value1 | Value2 | Result |
| ------ | ------ | ------ |
| False  | False  | False  |
| False  | True   | True   |
| True   | False  | True   |
| True   | True   | True   |

<b>NOT(!)</b>
| Value | Result |
| ----- | ------ |
| False | True   |
| True  | False  |

### 복합연산자
<b>삼항연산자</b>

```js
// 조건문이 True면 A, False면 B를 반환
let result = 조건문 ? A : B;
```

## 조건문 - if-else
> 분기점

```js
if( 조건 ) {
    // 조건이 맞다면 여기 실행
} else {
    // 조건이 아니면 여기 실행
}
```

```js
if( 조건1 ) {
    // 조건1이 맞다면 여기 실행
} else if( 조건2 ) {
    // 조건1이 아니고 조건2가 맞다면 여기 실행
} else if( 조건3 ) {
    // 조건1, 조건2가 아니고 조건3이 맞다면 여기 실행
} else {
    // 전부 아니라면 여기 실행
}
```

```js
if( 2 + 4 === 6 ) {
    console.log('정답입니다.');
} else {
    console.log('틀렸습니다.');
}
// '정답입니다.'

if( true ) {
    console.log('정답입니다.');
} else {
    console.log('틀렸습니다.');
}
// '정답입니다.'

if( false ) {
    console.log('정답입니다.');
} else {
    console.log('틀렸습니다.');
}
// '틀렸습니다.'

if( 1 ) {
    console.log('정답입니다.');
} else {
    console.log('틀렸습니다.');
}
// '정답입니다.'

if( 0 ) {
    console.log('정답입니다.');
} else {
    console.log('틀렸습니다.');
}
// '틀렸습니다.'
```

| 참을 나타내는 값                    | 거짓을 나타내는 값  |
| ----------------------------------- | ------------------- |
| true                                | false               |
| 0 보다 큰 숫자                      | 0, -0               |
| 공백을 포함한 비어 있지 않은 문자열 | ""과 같은 빈 문자열 |
| []과 같은 빈 배열                   | null                |
| {}과 같은 빈 Object                 | undefined           |
| function() {}과 같은 빈 함수        | NaN                 |

```js
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

if( typeof(profile.age) !== "number" ) {
    console.log("잘못된 타입입니다.");
}

if( profile.age >= 20 ) {
    console.log('성인입니다.');
} else if( profile.age >= 8 ) {
    console.log('학생입니다.');
} else if( profile.age >= 0 ) {
    console.log('어린이입니다.');
} else {
    console.log('잘못된 입력입니다.');
}
// "학생입니다."
```

## 반복문
> 같은 행위를 반복하는 것 \
> 핵심! 몇 번 반복할 것인가

```js
/*
실행순서
초기식 -> 조건식 -> 본문 -> 증감문 -> 조건식 -> 본문
*/
for( 초기식; 조건식; 증감문 ) {
    // 본문 : 반복해서 실행할 내용
}
```

```js
/*
초기식 : let i = 0;
조건식 : i < 10
증감문 : i++ ( === (i += 1) === (i = i + 1) )
*/
let result = "";
for( let i = 0; i < 10; i++ ) {
    result += i + ' ';
}
console.log(result);
// 0 1 2 3 4 5 6 7 8 9
```

```js
let children = ["철수", "영희", "훈이"];
for( let i = 0; i < 3; i++ ) {
    console.log( children[i] );
}
// "철수"
// "영희"
// "훈이"
```

```js
let children = ["철수", "영희", "훈이"];
for( let i = 0; i < children.length; i++ ) {
    console.log( children[i] );
}
// "철수"
// "영희"
// "훈이"
```

`${}`의 자세한 내용은 아래 링크를 참조하세요<br>
[template literals](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)
```js
const persons = [
    { name:   '철수', age: 18 },
    { name:   '영희', age: 22 },
    { name: '도우너', age:  5 },
    { name: '말포이', age: 14 },
    { name:   '도비', age:  3 },
];

// Case 1
for( let i = 0; i < persons.length; i++ ) {
    const p = persons[i];
    let result = "";

    if( p.age >= 20 ) {
        result = "님은 성인입니다.";
    } else {
        result = "님은 미성년자입니다.";
    }
    console.log(`${p.name}${result}`);
}

// Case 2
persons.forEach(p => {
    console.log(`${p.name}님의 나이는 ${p.age}세 입니다.`);
});
```

## 수학 객체
| `Math`              |                    |
| ------------------- | ------------------ |
| `Math.max(a, b, c)` | 최댓값             |
| `Math.min(a, b, c)` | 최솟값             |
| `Math.random()    ` | 0~1 사이의 랜덤 수 |
| `Math.round(1.2)  ` | 반올림             |
| `Math.ceil(1.2)   ` | 올림               |
| `Math.floor(1.2)  ` | 버림               |

```js
// 0 ~ 1 사이의 랜덤한 수
Math.random()

// 0 ~ 999999 인 숫자
const rand = Math.random() * 1000000 
// 0 ~ 999999 인 정수
Math.floor( rand )

// 가장 대표적인 랜덤 함수
// min ~ max - 1 의 랜덤한 정수 반환
function rand(min, max) {
    return Math.floor( Math.random() * ( max - min ) + min );
}

function getCode() {
    return rand( 100000, 1000000 );
}
```

## DOM 조작
> Document Object Model

```js
// tag = HTML 파일에서."tagID"라는 id를 가진 태그를 선택한다
const tag = document.getElementById("tagID");
```
| html             | js             |
| ---------------- | -------------- |
| 04-document.html | 04-document.js |
