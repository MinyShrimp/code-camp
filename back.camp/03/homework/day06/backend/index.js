import express        from "express";
import cors           from "cors";
import path           from "path";
import dotenv         from "dotenv";
import swaggerUi      from "swagger-ui-express";
import swaggerJsdoc   from "swagger-jsdoc";

import swaggerOptions from "./swagger/config.js";
import { token, getRandomToken, isValidToken } from "./src/token.js";
import { isValidPhoneNumber, sendSMS } from "./src/phone.js";
import { checkValidationEmail, getWelcomTemplate, sendTemplateToEmail } from './src/email.js';

/* Data */
const Users = [
    {
        email: "aaa@gamil.com",
        name: "철수",
        phone: "010-1111-1111",
        personal: "220512-1111111",
        prefer: "https://naver.com"
    }, 
    {
        email: "bbb@gamil.com",
        name: "영희",
        phone: "010-2222-2222",
        personal: "220512-2222222",
        prefer: "https://gmail.com"
    }, 
    {
        email: "ccc@gamil.com",
        name: "훈이",
        phone: "010-3333-3333",
        personal: "220512-3333333",
        prefer: "https://yahoo.com"
    }, 
    {
        email: "ddd@gamil.com",
        name: "맹구",
        phone: "010-4444-4444",
        personal: "220512-4444444",
        prefer: "https://nate.com"
    }, 
    {
        email: "eee@gamil.com",
        name: "짱구",
        phone: "010-5555-5555",
        personal: "220512-5555555",
        prefer: "https://velog.com"
    }, 
];

const Coffees = [
    { name: '에스프레소',      kcal: 0 },
    { name: '아메리카노',      kcal: 1 },
    { name: '마끼아또',        kcal: 2 },
    { name: '카푸치노',        kcal: 3 },
    { name: '카페라떼',        kcal: 4 },
    { name: '아포카토',        kcal: 5 },
    { name: '카페모카',        kcal: 6 },
    { name: '비엔나',          kcal: 7 },
    { name: '카라멜라떼',      kcal: 8 },
    { name: '카라멜 마끼아또', kcal: 9 },
]

const port = 3000;

/* express settings */
const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// .env setting
const __dirname = path.resolve();
dotenv.config({
    path: path.join(__dirname, '.env')
});

/* middleware */
app.use(cors({
    origin: [ "http://localhost:5500", "http://127.0.0.1:5500" ]
}));
app.use( express.json() );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end-point */
// GET http://localhost:3000/users
app.get('/users', ( req, res ) => {
    res.send( Users );
});

// GET http://localhost:3000/starbucks
app.get('/starbucks', ( req, res ) => {
    res.send( Coffees );
});

// POST http://localhost:3000/tokens/phone
app.post('/tokens/phone', async ( req, res ) => {
    const body = req.body;
    const myPhone = body.phone;

    const isValid = isValidPhoneNumber( myPhone );
    if( isValid ) {
        getRandomToken( 6 );

        const isOK = await sendSMS(myPhone, token);
        if( isOK ) {
            res.send("발송 성공");
        } else {
            res.status(400).send("발송 실패");
        }
    } else {
        res.status(400).send("발송 실패");
    }
});

// POST http://localhost:3000/tokens/phone
app.post('/tokens/phone/submit', async ( req, res ) => {
    const body = req.body;
    const submitToken = body.token;

    const isValid = isValidToken( submitToken );
    if( isValid ) {
        const isOK = true;
        if( isOK ) {
            res.send("인증 확인");
        } else {
            res.status(400).send("인증 실패");
        }
    } else {
        res.status(400).send("인증 실패");
    }
});

// POST http://localhost:3000/users
app.post('/users', async ( req, res ) => {
    const user = req.body;

    // 1. 이메일이 정상인지 확인 ( 1 - 존재여부, 2-"@" 포함여부 )
    const isValid = checkValidationEmail(user.email);
    if(isValid) {
        // 2. 가입환영 템플릿 만들기
        const myTemplate = getWelcomTemplate(user);

        // 3. 이메일에 가입환영 템플릿 전송하기
        const result = await sendTemplateToEmail(user.email, myTemplate);
        if(result) {
            res.send("가입 완료");    
        } else {
            res.status(400).send("가입 실패");
        }
    } else {
        res.status(400).send("가입 실패");
    }
})

/* start */
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});