import nodemailer from "nodemailer";

/**
 * Email Service
 */
class EmailService {
    constructor() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Utils => Controller
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 2자리 숫자 10 => "10"
     * 1자리 숫자 1  => "01"
     * @param {number} num
     * @returns String
     */
    paddingNumber = (num) => {
        return String(num).padStart(2, "0");
    };

    /**
     * 시간 Formatting
     * @param {Date} date
     * @returns "YYYY-MM-DD"
     */
    DateFormatting = (date) => {
        const _year = date.getFullYear();
        const _month = this.paddingNumber(date.getMonth() + 1);
        const _date = this.paddingNumber(date.getDate());

        return `${_year}-${_month}-${_date}`;
    };

    /**
     * 가입 환영 템플릿 제작
     * @param {string} name
     * @param {string} phone
     * @param {string} prefer
     * @returns HTML Template
     */
    getWelcomTemplate = (name, phone, prefer, createAt) => {
        return `
            <html>
                <head>
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            width: 100vw;
                            height: 100vh;
                            
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                        .container {
                            padding: 1em;
                            width: 800px;
                        }
                        .mb-10 {
                            margin-bottom: 10px;
                        }
                        .fs-50 {
                            font-size: 50px;
                        }
                        .fs-30 {
                            font-size: 30px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1 class="mb-10 fs-50"> ${name}님 가입을 환영합니다!!! </h1>
                        <hr class="mb-10" />
                        <div class="mb-10 fs-30"><b>이름</b> : ${name}</div>
                        <div class="mb-10 fs-30"><b>전화번호</b> : ${phone}</div>
                        <div class="mb-10 fs-30"><b>좋아하는 사이트</b> : ${prefer}</div>
                        <div class="fs-30"><b>가입일</b> : ${this.DateFormatting(
                            createAt
                        )}</div>
                    </div> 
                </body>
            </html>
        `;
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Controller => NodeMailer
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 이메일에 가입환영 템플릿 전송하기
     * @param {string} email
     * @param {string} template
     * @returns 전송 성공 여부
     */
    sendTemplateToEmail = async (email, template) => {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const info = await transporter.sendMail({
                from: process.env.EMAIL_SENDER,
                to: email,
                subject: "[코드캠프] 가입을 환영합니다",
                html: template,
            });

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };
}

export default EmailService;
