/*
1. 현재 날짜와 시간을 출력하는 함수를 하나 만들고, 
해당 함수를 실행하면 **`현재 시간`**으로 (예시: “오늘은 2022년 03월 15일 11:30:29입니다.”) 
같은 포맷의 메시지가 콘솔에 출력되도록 만들어 주세요.
-------
[X]  date.js 파일을 실행하면 현재 시간이 출력된다.
[X]  출력되는 **현재 시간**은 (“오늘은 2022년 03월 15일 11:30:29입니다.”) 같은 포맷이다.
 */

//  0 ~  9 => 00 ~ 09
// 10 ~ 99 => 10 ~ 99
const paddingNumber = ( num ) => {
    return String( num ).padStart(2, '0');
}

/**
 * 
 * @param { Date } any_date 
 * @returns { 
 *     year: year, 
 *     month: month, 
 *     date: date, 
 *     hour: hour, 
 *     min: min,
 *     sec: sec
 * };
 */
const dateFormatting = ( any_date ) => {
    const year  = any_date.getFullYear();
    const month = paddingNumber(any_date.getMonth() + 1);
    const date  = paddingNumber(any_date.getDate());
    const hour  = paddingNumber(any_date.getHours());
    const min   = paddingNumber(any_date.getMinutes());
    const sec   = paddingNumber(any_date.getSeconds());
    
    return { year, month, date, hour, min, sec };
}

function getNowDate() {
    const now = dateFormatting(new Date);
    return `오늘은 ${now.year}년 ${now.month}월 ${now.date}일 ${now.hour}:${now.min}:${now.sec}입니다.`;
}

console.log( getNowDate() );