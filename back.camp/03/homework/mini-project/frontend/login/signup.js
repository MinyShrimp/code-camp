
let phoneAuthOk = false;

// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {

    // 시간 돌아가는지 검사
    if( timer !== null ) { return false; }

    // 인증이 완료되었는지 검사
    // 되어 있으면 false
    if( phoneAuthOk ) { return false; }

    // phone 검사
    let phone = "";
    for( let i = 1; i <= 3; i++ ) {
        const value = document.getElementById(`PhoneNumber0${i}`).value;
        if( value === "" ) { return false; }
        phone += value;
    }

    try {
        // Backend로 데이터 보내기
        const res = await goServerPost("/tokens/phone", {
            "phone": phone
        });

        // 성공이면
        if( res.status === 200 ) {
            // 인증 번호 입력란 화면에 표시
            document.querySelector("#ValidationInputWrapper").style.display = "flex";
            console.log("인증 번호 전송");
            console.log(res);

            time = START_TIME;
            timer = window.setInterval(ticktock, 1000);

            return true;
        }
    } catch(e) {
        // statusCode가 400번대이면 여기로 옴
        console.log(e);
    }

    return false;
};

// 인증 완료 시간 
const ticktock = () => {
    time -= 1;
    document.getElementById(`LimitTime`).innerText = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}`;
    if(time <= 0) {
        timerInit();
        console.log("인증 번호 시간 지남");
    }
}

const submitToken = async () => {
    // 시간 안 돌아가는지 검사
    if( timer === null ) { return false; }
    
    // 인증이 완료되었는지 검사
    // 되어 있으면 false
    if( phoneAuthOk ) { return false; }

    try {
        // Backend로 데이터 보내기
        const submitTokenValue = document.getElementById("TokenInput").value;
        
        let phone = "";
        for( let i = 1; i <= 3; i++ ) {
            const value = document.getElementById(`PhoneNumber0${i}`).value;
            if( value === "" ) { return false; }
            phone += value;
        }

        const res = await goServerPatch("/tokens/phone", {
            "phone": phone,
            "token": submitTokenValue
        });
        console.log(res);

        // 성공이면
        if( res.data ) {
            console.log("인증 번호 확인!");

            // 타이머 종료
            window.clearInterval( timer );

            timerOk();

            return true;
        }
    } catch(e) {
        // statusCode가 400번대이면 여기로 옴
        console.log(e);
    }

    return false;
}

// 회원 가입 API 요청
const submitSignup = async () => {
    // 인증이 완료되었는지 검사
    // 안되어 있으면 false
    if( !phoneAuthOk ) { return false; }

    // 이름
    const name = document.getElementById("SignupName").value;
    if( name === "" ) { return false; }

    // 주민번호
    const personalPrefix = document.getElementById("SignupPersonal1").value;
    if( personalPrefix === "" ) { return false; }

    const personalSuffix = document.getElementById("SignupPersonal2").value;
    if( personalSuffix === "" ) { return false; }

    // 좋아하는 사이트
    const prefer = document.getElementById("SignupPrefer").value;
    if( prefer === "" ) { return false; }

    // 이메일
    const email = document.getElementById("SignupEmail").value;
    if( email === "" ) { return false; }

    // 비밀번호
    const pwd = document.getElementById("SignupPwd").value;
    if( pwd === "" ) { return false; }

    // 핸드폰
    let phone = "";
    for( let i = 1; i <= 3; i++ ) {
        const value = document.getElementById(`PhoneNumber0${i}`).value;
        if( value === "" ) { return false; }
        phone += value;
    }

    try {
        console.log("회원 가입 이메일 전송");

        const res = await goServerPost("/user", {
            name: name,
            personal: `${personalPrefix}-${personalSuffix}`,
            phone: phone,
            prefer: prefer,
            email: email,
            pwd: pwd
        });

        if( res.status === 200 ) {
            return true;
        }
    } catch(e) {
        console.log(e);
    }

    return false;
};
