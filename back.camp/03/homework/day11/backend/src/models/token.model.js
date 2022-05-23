import mongoose from "mongoose";

/**
 * Token Schema
 */
export const TokenSchema = new mongoose.Schema({
    token:    String,
    phone:    String,
    isAuth:   Boolean,
    createAt: Date,
    authAt:   Date,
});

/**
 * Token Schema DB와 연결
 */
const Token = mongoose.model(
    "Token", TokenSchema
);

export default Token;
