import nodemailer from "nodemailer";

// 2. 가입환영 템플릿 만들기

/**
 * 2자리 숫자 10 => "10"
 * 1자리 숫자 1  => "01"
 * @param {number} num 
 * @returns String
 */
const paddingNumber = ( num ) => {
    return String( num ).padStart(2, '0');
}

/**
 * 시간 Formatting
 * @param {Date} date 
 * @returns "YYYY-MM-DD"
 */
const DateFormatting = ( date ) => {
    const _year  = date.getFullYear();
    const _month = paddingNumber(date.getMonth() + 1);
    const _date  = paddingNumber(date.getDate());
    
    return `${_year}-${_month}-${_date}`;
}

/**
 * 가입 환영 템플릿 제작
 * @param {string} name
 * @param {string} phone
 * @param {string} prefer
 * @returns HTML Template
 */
export const getWelcomTemplate = ( name, phone, prefer ) => {
    const createdAt = new Date();

    return `
        <html>
            <body>
                <h1> ${name}님 가입을 환영합니다!!! </h1>
                <hr />
                <div>이름 : ${name}</div>
                <div>전화번호 : ${phone}</div>
                <div>좋아하는 사이트 : ${prefer}</div>
                <div>가입일 : ${DateFormatting(createdAt)}</div>
            </body>
        </html>
    `;
}

/**
 * 이메일에 가입환영 템플릿 전송하기
 * @param {string} email 
 * @param {string} template 
 * @returns 전송 성공 여부
 */
export const sendTemplateToEmail = async (email, template) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    
        const info = await transporter.sendMail({
            from: process.env.EMAIL_SENDER,
            to: email,
            subject: "[코드캠프] 가입을 환영합니다",
            html: template
        });

        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}