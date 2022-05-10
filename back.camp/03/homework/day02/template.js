/*
2. 회원가입을 축하하는 형태의 템플릿을 출력하는 함수를 만들어 주세요.
    * **이메일**, **주민번호**, **휴대폰 번호**, **내가 좋아하는 사이트**를 함수의 입력으로 받고, 해당 내용이 html 태그가 포함된 텍스트로 콘솔에 출력되어야 합니다.
-------
[X]  template.js 파일을 실행하면 회원가입템플릿이 출력된다.
[X]  회원가입템플릿에서 **이메일**, **주민번호**, **휴대폰 번호**, **내가 좋아하는 사이트**는 함수에서 입력 받은 값이 나온다.
*/

function transformSecretNumber( security ) {
    const [prefix, suffix] = security.split('-');

    let tmp = [...suffix];
    for(let i = 1; i <= 6; i++) { tmp[i] = '*'; }
    return `${prefix}-${tmp.join('')}`;
}

const getWelcomTemplate = ({ email, security, phone, favoritSite }) => {
    return `
        <html>
            <body>
                <h1>코드캠프님 가입을 환영합니다.</h1>
                <hr />
                <div>이메일: ${email}</div>
                <div>주민번호: ${transformSecretNumber(security)}</div>
                <div>휴대폰 번호: ${phone}</div>
                <div>내가 좋아하는 사이트: ${favoritSite}</div>
            </body>
        </html>
    `;
}

const request = {
    email: "support@codebootcamp.co.kr",
    security: "210510-1111111",
    phone: "010-0000-0000",
    favoritSite: "codebootcamp.co.kr"
};
console.log( getWelcomTemplate(request) );