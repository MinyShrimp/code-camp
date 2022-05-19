
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { getAllMenus } from "./src/views/starbucks.view.js";
import { signupAPI, getAllUserAPI } from "./src/views/user.view.js";
import { tokenAuthRequestView, tokenAuthOKView } from "./src/views/token.view.js";

////////////////////////////////////////////////////////////////////////////////////////////////
/* express settings */
////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();
const corsOptions = {
    origin: 'http://localhost:5500'
};
dotenv.config();

mongoose.connect("mongodb://my-db:27017/MiniProject");

////////////////////////////////////////////////////////////////////////////////////////////////
/* middleware */
////////////////////////////////////////////////////////////////////////////////////////////////
app.use( cors(corsOptions) );
app.use( express.json() );

////////////////////////////////////////////////////////////////////////////////////////////////
/* end-point */
////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 랜딩 페이지
 * GET http://localhost:3000
 */
app.get('/', ( req, res ) => {
    res.send("landing page");
});

////////////////////////////////////////////////////////////////////////////////////////////////
// 회원가입 API
// 구현 경로 : ./views/user.view.js

/**
 * 회원 목록 조회 API
 * GET http://localhost:3000/users
 * 
 * CHECK LIST
 *  - [X] API 요청 시 DB에 저장된 User 데이터의 목록을 응답으로 보내주세요.
 *  - [X] 보내주는 데이터에는  name, email, personal(주민번호), prefer(내가 좋아하는 사이트), phone(핸드폰번호), og 객체(오픈그래프 정보 title, description, image)가 포함되어야합니다.
 */
app.get('/users', getAllUserAPI);

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
app.post('/user', signupAPI);

////////////////////////////////////////////////////////////////////////////////////////////////
// 토큰 API
// 구현 경로 : ./views/token.view.js

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
app.post('/tokens/phone', tokenAuthRequestView);

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
app.patch('/tokens/phone', tokenAuthOKView);

////////////////////////////////////////////////////////////////////////////////////////////////
// 스타벅스 API
// 구현 경로 : ./views/starbucks.view.js

/**
 * 스타벅스 커피 목록 조회 API
 * GET /starbucks
 * 
 * CHECK LIST
 *  - [X] DB에 저장된 커피의 목록을 반환해주세요.
 *  - [X] 반환하는 커피 데이터에는 img, name, _id가 포함되어야합니다.
 */
app.get('/starbucks', getAllMenus);

////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(process.env.PORT, process.env.IP);