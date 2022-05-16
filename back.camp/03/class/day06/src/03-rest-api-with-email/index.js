
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import swaggerOptions from "./swagger/config.js";
import { getRandomToken, isValidPhoneNumber, sendSMS } from "./phone.js";
import { checkValidationEmail, getWelcomTemplate, sendTemplateToEmail } from './email.js';

/* express settings */
const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);
const corsOptions = {
    origin: 'http://localhost:5500'
};

// .env setting
const __dirname = path.resolve();
dotenv.config({
    path: path.join(__dirname, '../../.env')
});

/* data */
const datas = [];
let autoIncreaseIndex = 0;

/* middleware */
app.use( cors(corsOptions) );
app.use( express.json() );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end-point */

// POST http://localhost:3000/tokens/phone
app.post('/tokens/phone', async ( req, res ) => {
    const body = req.body;
    const myPhone = body.phone;

    const isValid = isValidPhoneNumber( myPhone );
    if( isValid ) {
        const myToken = getRandomToken( 6 );

        const isOK = await sendSMS(myPhone, myToken);
        if( isOK ) {
            res.send("발송 성공");
        } else {
            res.status(400).send("발송 실패");
        }
    } else {
        res.status(400).send("발송 실패");
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

app.listen(process.env.PORT, process.env.IP);