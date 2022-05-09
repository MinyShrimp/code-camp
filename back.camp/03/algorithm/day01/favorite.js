// 자신의 제일 좋아하는 음식 세 가지를 출력하는 함수를 만들어주세요. 출력 예제는 다음과 같습니다. "제가 좋아하는 음식은 자장면, 치킨, 피자입니다."

function favoriteFood(foods) {
    // Template literal을 사용해 보세요.
    return `제가 좋아하는 음식은 ${foods}입니다.`;
}

let arr = ["자장면, 치킨, 피자"];
console.log(favoriteFood(arr));
// 제가 좋아하는 음식은 자장면, 치킨, 피자입니다.
