
import { createUser, getAllUser } from "../controllers/user.controller.js";

import { getWelcomTemplate, sendTemplateToEmail } from "../utils/email.utils.js";
import { getOpenGraph, getPersonal } from "../utils/signup.utils.js";
import { isValidSignupRequestData } from "../utils/isValid.utils.js";

////////////////////////////////////////////////////////////////////////////////////////////////
// 회원가입 View

/**
 * 회원 목록 조회 API
 * GET http://localhost:3000/users
 * 
 * CHECK LIST
 *  - [X] API 요청 시 DB에 저장된 User 데이터의 목록을 응답으로 보내주세요.
 *  - [X] 보내주는 데이터에는  name, email, personal(주민번호), prefer(내가 좋아하는 사이트), phone(핸드폰번호), og 객체(오픈그래프 정보 title, description, image)가 포함되어야합니다.
 */
export const getAllUserAPI = async ( req, res ) => {
    const allUsers = await getAllUser();
    res.send(allUsers);
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
 * 
 * CHECK LIST
 *  - [X] API 요청시 입력 받은 name, email, personal(주민번호), prefer(내가 좋아하는 사이트), pwd(비밀번호), phone(핸드폰번호)를 서버에 함께 보내주어야합니다.
 *  - [X] 입력 받은 핸드폰 번호로 `Tokens` 문서를 검색해 해당 번호의 isAuth가 true인지 확인합니다.
 *      - [X] 핸드폰 번호가 없거나, isAuth가 false라면 클라이언트에 `422` 상태코드와 함께 에러 문구를 반환합니다.
 *  - [X] true 라면 아래의 로직을 수행합니다.
 *      - [X] 내가 좋아하는 사이트로 입력 받은 사이트를 cheerio를 활용하여 scraping 한 후, 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함께 `User` DB에 저장해주세요.
 *      - [X] 메타 태그 정보는 og 객체에 (title, description, image)가 들어있도록 만들어주세요.
 *      - [X] personal(주민번호)는 뒷자리를 `*`로 바꾼후 저장해주세요. (220101-*******)
 *      - [X] DB에 저장한 후, 회원 가입 환영 이메일을 실제로 전송해주세요.
 *      - [X] 생성된 user의 _id를 클라이언트에 반환합니다.
 */
export const signupAPI = async (req, res) => {
    const body = req.body;

    // Request Data 검증
    const isValid = await isValidSignupRequestData(body);
    if( !isValid[0] ) {
        res.status(422).send(isValid[1]);
        return false;
    }
    
    // true 라면 아래의 로직을 수행합니다. 
    //  - 내가 좋아하는 사이트로 입력 받은 사이트를 cheerio를 활용하여 scraping 한 후, 관련 오픈그래프(OG) 메타 태그 정보를 다른 입력 받은 정보들과 함께 `User` DB에 저장해주세요.
    //  - 메타 태그 정보는 og 객체에 (title, description, image)가 들어있도록 만들어주세요.
    body["og"] = await getOpenGraph( body.prefer );
    
    //  - personal(주민번호)는 뒷자리를 `*`로 바꾼후 저장해주세요. (220101-*******)
    body.personal = getPersonal( body.personal );

    //  - DB에 저장한 후, 
    const user_id = await createUser( body );

    // - 회원 가입 환영 이메일을 실제로 전송해주세요.
    const template = getWelcomTemplate( body.name, body.phone, body.prefer, body.createAt );
    await sendTemplateToEmail( body.email, template );
    
    //  - 생성된 user의 _id를 클라이언트에 반환합니다.
    res.send(user_id);
}