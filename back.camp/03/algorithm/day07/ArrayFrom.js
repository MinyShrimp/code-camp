// 배열의 길이를 지정하면, 배열의 짝수번째 인덱스는 2로 홀수번째는 3인 배열을 생성하는 함수를 만들어주세요.

function* rangeIterator(start = 0, end = Infinity, step = 1) {
    let n = 0;
    for (let i = start; i < end; i += step) {
        n++;
        yield i;
    }
    return n;
}

function array(n) {
    // Array.from을 사용해주세요.
    let arr = Array.from( rangeIterator(0, n), (num, i) => {
        return i % 2 === 0 ? 2 : 3;
    });

    return arr;
}

console.log(array(10)); //[ 2, 3, 2, 3, 2, 3, 2, 3, 2, 3 ]
