
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { getRandomToken, isValidPhoneNumber, sendSMS } from "./src/phone.js";
import { createToken, getTokenByPhone, removeAll, updateToken, authOk, getTokenAll } from "./models/token.model.js";

////////////////////////////////////////////////////////////////////////////////////////////////
/* express settings */
////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();
const corsOptions = {
    origin: '*'
};

mongoose.connect("mongodb://my-db:27017/MiniProject");

////////////////////////////////////////////////////////////////////////////////////////////////
/* middleware */
////////////////////////////////////////////////////////////////////////////////////////////////
app.use( cors(corsOptions) );
app.use( express.json() );

////////////////////////////////////////////////////////////////////////////////////////////////
/* end-point */
////////////////////////////////////////////////////////////////////////////////////////////////

// GET http://localhost:3000/
app.get('/', ( req, res ) => {
    res.send("test");
});

// TOKEN TEST

// GET http://localhost:3000/tokens/phone
app.get('/tokens/phone', async ( req, res ) => {
    const result = await getTokenAll();
    res.send(result);
});

// DELETE http://localhost:3000/tokens/phone
app.delete('/tokens/phone', async ( req, res ) => {
    const result = await removeAll();
    res.send({ msg: "모두 삭제되었습니다.", ...result });
});

////////////////////////////////////////////////////////////////////////////////////////////////
// TOKENs

// POST http://localhost:3000/tokens/phone
app.post('/tokens/phone', async ( req, res ) => {
    // Postman에서 해당 API를 요청할 때, 핸드폰 번호를 전달해줍니다. 
    const body    = req.body;
    const myPhone = body.phone;

    // 핸드폰 번호 유효한지 확인
    const isValid = isValidPhoneNumber( myPhone );
    if( !isValid ) {
        res.status(400).send("발송 실패");
        return false;
    }
    
    // 인증 토큰 생성
    const myToken = getRandomToken( 6 );

    // 찾아서
    const result = await getTokenByPhone( myPhone );
    if( result === null ) {
        // 없으면 생성
        await createToken( myToken, myPhone );
    } else {
        // 있으면 새로운 인증토큰으로 업데이트
        await updateToken( myToken, myPhone );
    }

    // 핸드폰에 보냄
    const isOK = await sendSMS(myPhone, myToken);
    if( isOK ) {
        res.send(`${myPhone}으로 인증 문자가 전송되었습니다.`);
        return true;
    } else {
        res.status(400).send("발송 실패");
        return false;
    }
});

// PATCH http://localhost:3000/tokens/phone
app.patch('/tokens/phone', async ( req, res ) => {

    // 핸드폰 번호와 마지막으로 생성된 인증 토큰을 전달해 줍니다.
    // ? => 생성된 인증 토큰이 아니라 사용자가 입력한 인증 토큰이 아닌가요?
    const body    = req.body;
    const token   = body.token;
    const myPhone = body.phone;

    // API 요청시 입력 받은 핸드폰 번호를 Tokens 문서에서 찾아봅니다. 
    const info = await getTokenByPhone( myPhone );
    if( info === null ) {
        // 핸드폰 번호가 저장되어 있지 않다면 클라이언트에 false를 응답하고 함수가 종료됩니다.
        res.status(400).send("핸드폰 번호가 등록되어있지 않습니다.");
        return false;
    }

    // 이미 인증이 완료되었다면,
    // 클라이언트에 false를 응답하고 함수가 종료됩니다.
    if( info.isAuth ) {
        res.status(400).send("인증이 이미 완료되었습니다.");
        return false;
    }

    // 해당 핸드폰 번호에 함께 저장된 토큰이, 
    // 입력 받은 토큰과 일치하지 않는다면 클라이언트에 false를 응답하고 함수가 종료됩니다.
    if( token !== info.token  ) {
        res.status(400).send("토큰이 일치하지 않습니다.");
        return false;
    }

    // 토큰이 일치하면, isAuth를 true로 변경하여 DB에 저장합니다.
    await authOk( myPhone );
    res.send("인증이 완료되었습니다.");
    return true;
});

app.listen(process.env.PORT, process.env.IP);