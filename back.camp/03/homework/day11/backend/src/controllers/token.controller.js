import TokenService from "./services/token.service.js";
import PhoneService from "./services/phone.service.js";
import ValidService from "./services/valid.service.js";

/**
 * Token Controller
 */
class TokenController {
    tokenService = new TokenService();
    phoneService = new PhoneService();
    validService = new ValidService();

    constructor() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // TO API
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 토큰 인증 요청 API
     * POST http://localhost:3000/tokens/phone
     */
    tokenAuthRequestAPI = async ( req, res ) => {
        // Postman에서 해당 API를 요청할 때, 핸드폰 번호를 전달해줍니다. 
        const body    = req.body;
        const phone = body.phone;
    
        // 핸드폰 번호 유효한지 확인
        if( !this.validService.isValidPhoneNumber( phone ) ) {
            res.status(400).send("발송 실패");
            return false;
        }
        
        // 인증 토큰 생성
        const token = this.phoneService.getRandomToken( 6 );
    
        // 찾아서
        const result = await this.tokenService.getTokenByPhone( phone );
        if( result === null ) {
            // 없으면 생성
            await this.tokenService.createToken( token, phone );
        } else {
            // 있으면 새로운 인증토큰으로 업데이트
            await this.tokenService.updateToken( token, phone );
        }
    
        // 핸드폰에 보냄
        // const isOK = await this.phoneService.sendSMS(phone, token);
        const isOK = true;
        if( isOK ) {
            res.send(`핸드폰으로 인증 문자가 전송되었습니다! - ${token}`);
            // res.send(`핸드폰으로 인증 문자가 전송되었습니다!`);
            return true;
        } else {
            res.status(400).send("발송 실패");
            return false;
        }
    }

    /**
     * 토큰 인증 완료 API
     * PATCH http://localhost:3000/tokens/phone
     */
    tokenAuthOKAPI = async ( req, res ) => {
        // 핸드폰 번호와 마지막으로 생성된 인증 토큰을 전달해 줍니다.
        // ? => 생성된 인증 토큰이 아니라 사용자가 입력한 인증 토큰이 아닌가요?
        const body  = req.body;
        const token = body.token;
        const phone = body.phone;

        // Request Data 검사
        if( !this.validService.isValidPatchTokenRequestData( body ) ) {
            res.send(false);
            return false;
        }

        // API 요청시 입력 받은 핸드폰 번호를 Tokens 문서에서 찾아봅니다. 
        const info = await this.tokenService.getTokenByPhone( phone );
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
        await this.tokenService.authOk( phone );
        res.send(true);
    }
}

export default TokenController;