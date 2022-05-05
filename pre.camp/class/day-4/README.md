# Day 4 - JS
## 함수
```js
function hello() {
    alert('안녕하세요');
}

function hello( name ) {
    const result = `${name}님 안녕하세요`;
    console.log(result);
    return result;
}
```

```js
let persons = [
    {name: '철수', age:18},
    {name: '영희', age:22},
    {name: '도우너', age:5},
    {name: '말포이', age:14},
    {name: '도비', age:3},
]
function greetingPersons( persons ) {
    persons.forEach(p => {
        console.log(`${p.name}님 반갑습니다`);
    });
}
greetingPersons(persons);
```

## 내장함수
> 자주 사용되는 함수를 자바스크립트에 내장하여 편리하게 이용할 수 있도록 한 것

| `setInterval(func, ms)` | `setTimeout(func, ms)` |
| ----------------------- | ---------------------- |
| 계속 반복               | 한 번만 반복           |
| return => id            | return => id           |

| `clearInterval(id)` |
| ------------------- |
| Interval Stop       |

```js
setTimeout(function () {
    console.log("3초가 지났습니다");
}, 3000);

setTimeout(() => {
    console.log("3초가 지났습니다");
}, 3000);

setInterval(function () {
    console.log("1초가 지났습니다");
}, 1000);

setInterval(() => {
    console.log("1초가 지났습니다");
}, 1000);
```
```js
let time = 10;
const intervalID = setInterval(() => {
    if(time <= 0) {
        clearInterval(intervalID);
        return ;
    }
    console.log(time--);
}, 1000);
```
```js
const getStringZero( value ) {
    return String(value).padStart(2, "0");
}

let time = 180;
const intervalID = setInterval(() => {
    if(time <= 0) {
        clearInterval(intervalID);
        return ;
    }
    const min = getStringZero( Math.floor( time / 60 ) );
    const sec = getStringZero( time % 60 );
    console.log(`${min}:${sec}`);

    time -= 1;
}, 1000);
```