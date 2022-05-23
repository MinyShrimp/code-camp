import Token from "../models/token.model.js";

/**
 * 새로운 Token 생성
 * @param {string} token
 * @param {string} phone
 * @returns 생성된 Token Data
 */
export const createToken = async (token, phone) => {
    const newToken = new Token({
        token:    token,
        phone:    phone,
        isAuth:   false,
        createAt: new Date(),
        authAt:   null,
    });
    await newToken.save();
    return newToken;
};

/**
 * DB 안에서 Token을 찾아서 업데이트
 * @param {string} token
 * @param {string} phone
 * @returns 업데이트된 Token Data
 */
export const updateToken = async (token, phone) => {
    const result = await Token.updateOne(
        { phone: phone },
        {
            token:    token,
            isAuth:   false,
            createAt: new Date(),
            authAt:   null,
        }
    );
    return result;
};

/**
 * DB 안에서 Token 업데이트 - 인증 확인
 * @param {string} phone
 * @returns 인증 확인된 Token Data
 */
export const authOk = async (phone) => {
    const result = await Token.updateOne(
        { phone: phone },
        { 
            token: "authok", 
            isAuth: true, 
            authAt: new Date() 
        }
    );
    return result;
};

/**
 * 핸드폰 번호를 기준으로 DB에서 데이터 찾기
 * @param {string} phone
 * @returns 찾은 단일 Token Data
 */
export const getTokenByPhone = async (phone) => {
    const result = await Token.findOne({ phone: phone });
    return result;
};

/**
 * 모든 Token List 가져오기
 * @returns 모든 Token Data
 */
export const getTokenAll = async () => {
    const result = await Token.find();
    return result;
};

/**
 * DB에 저장된 모든 Token 정보 삭제
 * @returns 삭제 결과 Log
 */
export const removeAll = async () => {
    const result = await Token.deleteMany();
    return result;
};
