
function getWelcomTemplate( { name, age, school, createdAt } ) {
    const result = `
        <html>
            <body>
                <h1> ${name}님 가입을 환영합니다!!! </h1>
                <hr />
                <div>이름 : ${name}</div>
                <div>나이 : ${age}살</div>
                <div>학교 : ${school}</div>
                <div>가입일 : ${createdAt}</div>
            </body>
        </html>
    `;

    console.log(result);
}

const name = "영희";
const age = 12;
const school = "토끼초등학교";
const createdAt = "2020-01-02";

/**
 * 짧게 쓰는 방식
const myUser = {
    name: name, 
    age: age, 
    school: school, 
    createdAt: createdAt
};
 */
getWelcomTemplate({ name, age, school, createdAt });