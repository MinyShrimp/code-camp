import mongoose from "mongoose";

export const TokenSchema = new mongoose.Schema({
    token: String,
    phone: String,
    isAuth: Boolean
});

const Token = mongoose.model(
    "Token", TokenSchema
);

export default Token;