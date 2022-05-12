
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import config from "../00-config/config.js";
import { getRandomToken, isValidPhoneNumber, sendSMS } from "./phone.js";

/* express settings */
const app = express();

const swaggerSpec = swaggerJsdoc(config.swaggerOptions);

/* data */
const datas = [];
let autoIncreaseIndex = 0;

/* middleware */
app.use( express.json() );
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* end-point */

// GET http://localhost:3000/boards
app.get('/boards', ( req, res ) => {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    // 2. 꺼내온 결과 응답 주기
    res.send( datas );
});

// POST http://localhost:3000/boards
app.post('/boards', ( req, res ) => {
    // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
    let newItem = req.body;
    newItem["_id"] = autoIncreaseIndex++;
    datas.push(newItem);

    // 2. 꺼내온 결과 응답 주기
    res.send( newItem );
});

// POST http://localhost:3000/tokens/phone
app.post('/tokens/phone', ( req, res ) => {
    const body = req.body;
    const myPhone = body.phone;

    const isValid = isValidPhoneNumber( myPhone );
    if( isValid ) {
        const myToken = getRandomToken( 6 );
        const responseMsg = sendSMS(myPhone, myToken);
        res.send(responseMsg);
    } else {
        res.status(400).send("인증 실패");
    }
});



app.listen(config.port, config.ip);