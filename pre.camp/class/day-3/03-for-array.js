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

// Case 1
for( let i = 0; i < fruits.length; i++ ) {
    const f = fruits[i];
    console.log(`${f.number} ${f.title}`);
}

// Case 2
fruits.forEach(f => {
    console.log(`${f.number} ${f.title}`);
});
