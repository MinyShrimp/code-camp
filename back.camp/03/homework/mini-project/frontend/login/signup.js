// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
    document.querySelector("#ValidationInputWrapper").style.display = "flex";
    console.log("인증 번호 전송");
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
    console.log("핸드폰 인증 완료");
};

// 회원 가입 API 요청
const submitSignup = async () => {
    console.log("회원 가입 완료");
};
