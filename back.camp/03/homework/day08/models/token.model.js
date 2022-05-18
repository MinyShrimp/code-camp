import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    token: String,
    phone: String,
    isAuth: Boolean
});

const Token = mongoose.model(
    "Token", TokenSchema
);

// 새로운 Token 생성
export const createToken = async ( token, phone ) => {
    const newToken = new Token({
        token:  token,
        phone:  phone,
        isAuth: false
    });
    await newToken.save();
}

// Token 업데이트
export const updateToken = async ( token, phone ) => {
    const result = await Token.updateOne({ phone: phone }, { token: token, isAuth: false });
    return result;
}

// 인증 완료
export const authOk = async ( phone ) => {
    const result = await Token.updateOne({ phone: phone }, { token: "authok", isAuth: true });
    return result;
}

// 핸드폰 번호를 기준으로 데이터 찾기
export const getTokenByPhone = async ( phone ) => {
    const result = await Token.findOne({ phone: phone });
    return result;
}

// 모두 찾기
export const getTokenAll = async ( ) => {
    const result = await Token.find();
    return result;
}

// 모두 삭제
export const removeAll = async () => {
    const result = await Token.deleteMany();
    return result;
}