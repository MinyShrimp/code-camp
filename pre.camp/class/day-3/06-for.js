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
    console.log(`${p.name}님의 나이는 ${p.age}세 입니다.`);
}

// Case 2
persons.forEach(p => {
    console.log(`${p.name}님의 나이는 ${p.age}세 입니다.`);
});