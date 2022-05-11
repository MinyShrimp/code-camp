
# DAY 3

## 구조분해할당을 더 깊이있게
### SpreadOperator => 얕은 복사
```js
let profile = {
    name: '철수',
    age: 13,
    school: '다람쥐초등학교'
};
let profile2 = {...profile};
profile2.name = "영희";
console.log(profile.name, profile2.name) // "철수", "영희"

let profile3 = profile;
profile3.name = "훈이";
console.log(profile.name, profile3.name) // "훈이", "훈이"
```

```js
let profile = {
    name: '철수',
    age: 13,
    school: '다람쥐초등학교',
    hobby: {
        hobby1: "수영하기",
        hobby2: "게임하기"
    }
};
let profile2 = {...profile};
profile2.hobby.hobby1 = "독서하기";
console.log( profile.hobby.hobby1, profile2.hobby.hobby1 );

let profile3 = JSON.parser( JSON.stringify( profile ) );
profile3.hobby.hobby1 = "잠자기";
console.log( profile.hobby.hobby1, profile3.hobby.hobby1 );
```

### RestParameter
```js
let profile = {
    name: '철수',
    age: 13,
    school: '다람쥐초등학교'
};

const { name, ...rest } = profile;
console.log(rest); // { age: 13, school: '다람쥐초등학교' }
```

```js
const child = {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교",
    money: 2000,
    hobby: "수영"
};
const { school, ...rest } = child;
```

## 데이터 전송 방법에 대해
### HTTP
### API
### Graphql
### REST

## 데이터 전송 실습
### Postman
### Playground