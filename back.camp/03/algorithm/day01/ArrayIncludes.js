// 코캠컴퍼니에서는 신입사원을 뽑고있습니다.
// 프론트엔드 직무 지원자 명단과
// 백엔드 직무 지원자 명단이 주어질 때,
// 중복 지원한 사람을 찾아 배열에 담아 리턴해주세요.
function solution(front, back) {
    front.sort();
    back.sort();
    let result = [];

    for (let i = 0, j = 0; i < front.length && j < back.length; ) {
        if (front[i] === back[j]) {
            result.push(front[i]);
            i += 1;
            j += 1;
        } else if (front[i] <= back[j]) {
            i += 1;
        } else {
            j += 1;
        }
    }

    return result;

    // return back.filter(x => front.includes(x));
}

const front = ["아라", "세준", "재환"];
const back = ["지연", "아라", "재훈"];
const result = solution(front, back);
console.log("결과", result); // ["아라"]
