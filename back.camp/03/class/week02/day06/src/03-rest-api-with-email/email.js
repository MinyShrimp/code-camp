import nodemailer from "nodemailer";

// 1. 이메일이 정상인지 확인 ( 1 - 존재여부, 2-"@" 포함여부 )
export const checkValidationEmail = (email) => {
    // 1-1. 존재 여부
    if( email === undefined ) {
        return false;
    }

    // 1-2. "@" 포함 여부
    if( !email.includes('@') ) {
        return false;
    }

    return true;
}

// 2. 가입환영 템플릿 만들기
const paddingNumber = ( num ) => {
    return String( num ).padStart(2, '0');
}

const DateFormatting = ( date ) => {
    const _year  = date.getFullYear();
    const _month = paddingNumber(date.getMonth() + 1);
    const _date  = paddingNumber(date.getDate());
    
    return `${_year}-${_month}-${_date}`;
}

export const getWelcomTemplate = ( { name, age, school } ) => {
    const createdAt = new Date();

    return `
        <html>
            <body>
                <h1> ${name}님 가입을 환영합니다!!! </h1>
                <hr />
                <div>이름 : ${name}</div>
                <div>나이 : ${age}살</div>
                <div>학교 : ${school}</div>
                <div>가입일 : ${DateFormatting(createdAt)}</div>
            </body>
        </html>
    `;
}

// 3. 이메일에 가입환영 템플릿 전송하기
export const sendTemplateToEmail = async (email, template) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PWD
            }
        });
    
        const info = await transporter.sendMail({
            from: process.env.NODEMAILER_SENDER,
            to: email,
            subject: "[코드캠프] 가입을 환영합니다",
            html: template
        });
        
        console.log(info);

        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}