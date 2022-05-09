// 학생들의 이름이 가나다 순서로 정렬된 배열이 있습니다.
// 이름이 '조'로 시작하는 학생이 제일 처음
// 등장하는 인덱스를 리턴하는 콜백함수 cb를 완성해주세요.
const arr = ["김세준", "백선호", "조아라", "홍재훈"];

function cb(element) {
    return element[0] === "조";
}

const result = arr.findIndex(cb);

console.log("결과", result); // 2
