# Day 3 - JS

# OT
## 웹앱 서비스 기본구조
> FrontEnd -(Request)-> BackEnd -> DB -> BackEnd -(Response)-> FrontEnd

![](../../../pictures/WebAppServiceFrame.png)

# JS
## 연산자
### 산술연산자
> Return 값 = int or float

|     |        |     |       |
| --- | ------ | --- | ----- |
| +   | 더하기 | -   | 빼기  |
| *   | 곱하기 | ^   | 제곱  |
| /   | 나누기 | %   | 몫    |
| ++  | 1증가  | --  | 1감소 |

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

|      |     |                                   |
| ---- | --- | --------------------------------- |
| &&   | AND | 양쪽이 모두 True이면 True를 반환  |
| \|\| | OR  | 한쪽만 True여도 True를 반환       |
| !    | NOT | True면 False, False면 True를 반환 |

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

## 조건문 - if-else

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

if( profile.age >= 20 ) {
    console.log('성인입니다.');
} else if( profile.age >= 8 ) {
    console.log('학생입니다.');
} else {
    console.log('어린이입니다.');
}
// "학생입니다."
```