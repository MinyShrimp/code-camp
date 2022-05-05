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