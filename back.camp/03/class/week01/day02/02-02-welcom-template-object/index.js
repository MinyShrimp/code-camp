
function getWelcomTemplate( user ) {
    const result = `
        <html>
            <body>
                <h1> ${user.name}님 가입을 환영합니다!!! </h1>
                <hr />
                <div>이름 : ${user.name}</div>
                <div>나이 : ${user.age}살</div>
                <div>학교 : ${user.school}</div>
                <div>가입일 : ${user.createdAt}</div>
            </body>
        </html>
    `;

    console.log(result);
}

const myUser = {
    name: "철수",
    age: 13,
    school: "다람쥐초등학교",
    createdAt: "2020-01-02"
};

getWelcomTemplate(myUser);