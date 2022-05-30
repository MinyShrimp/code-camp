// 1. 메소드 데코레이터에 들어갈 수 있는 화살표 함수
// function zzz() {
//     return function (target, property) {
//         console.log(target); // 해당 클래스
//         console.log(property); // 해당 메소드 이름
//     };
// }

// class Aaa {
//     @zzz()
//     mypower = 10;

//     @zzz()
//     getHello1() {
//         console.log("안녕하세요~");
//     }

//     @zzz()
//     getHello2 = () => {
//         console.log("반갑습니다~");
//     };
// }

//
//
//
// 2. 메소드 데코레이터에 들어갈 수 없는 화살표 함수(descriptor를 받는 경우)
function qqq() {
    return function (target, property, descriptor) {
        console.log(target); // 해당 클래스
        console.log(property); // 해당 메소드 이름
        console.log(descriptor); // 해당 메소드 정보(함수 내용 포함)
    };
}

class Bbb {
    // @ts-ignore
    @qqq()
    mypower = 10;

    @qqq()
    getHello1() {
        console.log("안녕하세요~");
    }

    // @ts-ignore
    @qqq() // descriptor 에서 거부됨(함수가 아닌 변수로 인식하므로 descriptor에 들어갈 수 없음)
    getHello2 = () => {
        console.log("반갑습니다~");
    };
}
