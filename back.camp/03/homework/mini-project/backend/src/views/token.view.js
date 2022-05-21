
import { isValidPhoneNumber } from "../utils/isValid.utils.js";
import { getRandomToken, sendSMS } from "../utils/phone.utils.js";
import { getTokenByPhone, createToken, updateToken, authOk } from "../controllers/token.controller.js";

/**
 * 토큰 인증 요청 API
 * POST http://localhost:3000/tokens/phone
 * 
 * CHECK LIST
 *  - [X] API 요청시 입력 받은 핸드폰 번호를 서버로 보내주세요.
 *  - [X] 토큰을 생성하고, 생성한 토큰을 문자로 전송해주세요.
 *  - [X] 이때, 입력받은 핸드폰 번호로 문자를 보냅니다.
 *  - [X] 핸드폰 번호와 토큰, 그리고 isAuth는 false 값으로 DB에 저장합니다.
 *  - [X] 해당 핸드폰 번호가 이미 `Tokens` 문서에 저장되어 있다면 최신 토큰으로 덮어씁니다.
 *  - [X] 클라이언트에 응답으로 “핸드폰으로 인증 문자가 전송되었습니다!”를 보내줍니다.
 */
export const tokenAuthRequestView = async ( req, res ) => {
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
    // const isOK = await sendSMS(myPhone, myToken);
    const isOK = true;
    if( isOK ) {
        res.send(`핸드폰으로 인증 문자가 전송되었습니다! - ${myToken}`);
        return true;
    } else {
        res.status(400).send("발송 실패");
        return false;
    }
}

/**
 * 토큰 인증 완료 API
 * PATCH http://localhost:3000/tokens/phone
 * 
 * CHECK LIST
 *  - [X] API 요청시 입력 받은 핸드폰 번호를 `Tokens` 문서에서 찾아봅니다.
 *  - [X] 핸드폰 번호가 저장되어 있지 않다면 클라이언트에 false를 응답해줍니다.
 *  - [X] 해당 핸드폰 번호에 함께 저장된 토큰이, 입력 받은 토큰과 일치하지 않는다면 클라이언트에 false를 응답해줍니다.
 *  - [X] 토큰이 일치하고, isAuth가 false라면 true로 변경하여 DB에 저장합니다.
 *  - [X] 잘 저장되었다면 클라이언트에 true를 응답해줍니다.
 */
export const tokenAuthOKView = async ( req, res ) => {
    // 핸드폰 번호와 마지막으로 생성된 인증 토큰을 전달해 줍니다.
    // ? => 생성된 인증 토큰이 아니라 사용자가 입력한 인증 토큰이 아닌가요?
    const body    = req.body;
    const token   = body.token;
    const myPhone = body.phone;

    // API 요청시 입력 받은 핸드폰 번호를 Tokens 문서에서 찾아봅니다. 
    const info = await getTokenByPhone( myPhone );
    if( info === null ) {
        // 핸드폰 번호가 저장되어 있지 않다면 클라이언트에 false를 응답하고 함수가 종료됩니다.
        res.send(false);
        return false;
    }

    // 이미 인증이 완료되었다면,
    // 클라이언트에 false를 응답하고 함수가 종료됩니다.
    if( info.isAuth ) {
        res.send(false);
        return false;
    }

    // 해당 핸드폰 번호에 함께 저장된 토큰이, 
    // 입력 받은 토큰과 일치하지 않는다면 클라이언트에 false를 응답하고 함수가 종료됩니다.
    if( token !== info.token ) {
        res.send(false);
        return false;
    }

    // 토큰이 일치하면, isAuth를 true로 변경하여 DB에 저장합니다.
    await authOk( myPhone );
    res.send(true);
    return true;
}