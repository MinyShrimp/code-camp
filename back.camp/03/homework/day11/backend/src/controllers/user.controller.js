import UserService from "./services/user.service.js";
import TokenService from "./services/token.service.js";
import EmailService from "./services/email.service.js";
import ValidService from "./services/valid.service.js";
import CheerioService from "./services/cheerio.service.js";

/**
 * User Controller
 */
class UserController {
    userService = new UserService();
    tokenService = new TokenService();
    emailService = new EmailService();
    validService = new ValidService();
    cheerioService = new CheerioService();

    constructor() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // TO API
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 회원 목록 조회 API
     * GET http://localhost:3000/users
     */
    getAllUserAPI = async ( req, res ) => {
        const result = await this.userService.getAllUser();
        res.send(result);
    }

    /**
     * 회원 가입 API
     * POST http://localhost:3000/user
     * Request {
     *      "name": "아라111",
     *      "email": "ala@gamil.com",
     *      "personal": "220101-1111111",
     *      "prefer": "https://naver.com",
     *      "pwd": "1234",
     *      "phone": "01012345678"
     * }
     */
    signupAPI = async (req, res) => {
        const body = req.body;
    
        // Request Data 검증
        const isValid = await this.validService.isValidSignupRequestData(body);
        if( !isValid[0] ) {
            res.status(422).send(isValid[1]);
            return false;
        }
    
        // 현재 시각 받아서 저장하기
        body["createAt"] = new Date();
    
        // true 라면 아래의 로직을 수행합니다. 
        //  - 내가 좋아하는 사이트로 입력 받은 사이트를 cheerio를 활용하여 scraping 한 후, 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함께 `User` DB에 저장해주세요.
        //  - 메타 태그 정보는 og 객체에 (title, description, image)가 들어있도록 만들어주세요.
        body["og"] = await this.cheerioService.getOpenGraph( body.prefer );
        
        //  - personal(주민번호)는 뒷자리를 `*`로 바꾼후 저장해주세요. (220101-*******)
        body.personal = this.userService.getPersonal( body.personal );
    
        // 비밀번호 암호화
        [ body["pwd"], body["salt"] ] = await this.userService.getHashPassword( body.pwd );
    
        //  - DB에 저장한 후, 
        const user_id = await this.userService.createUser( body );
    
        // - 회원 가입 환영 이메일을 실제로 전송해주세요.
        const template = this.emailService.getWelcomTemplate( body.name, body.phone, body.prefer, body.createAt );
        await this.emailService.sendTemplateToEmail( body.email, template );
        
        //  - 생성된 user의 _id를 클라이언트에 반환합니다.
        res.send(user_id);
    }
}

export default UserController;