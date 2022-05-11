// switch-case를 이용해서 오늘의 요일을 출력해주세요.
// HINT: MDN Date

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
let day = new Date().getDay();

switch (day) {
    case 1:
        dayName = "월요일";
        break;
    case 2:
        dayName = "화요일";
        break;
    case 3:
        dayName = "수요일";
        break;
    case 4:
        dayName = "목요일";
        break;
    case 5:
        dayName = "금요일";
        break;
    case 6:
    case 0:
        dayName = "주말입니다";
        break;
}
console.log(dayName);

let dayName = `${DAYS[day]}요일`;
console.log(dayName);
