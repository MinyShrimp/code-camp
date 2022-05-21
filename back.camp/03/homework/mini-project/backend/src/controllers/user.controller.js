
import User from "../models/user.model.js";

/**
 * 새로운 유저 생성
 * @param {object} user 
 * @returns 생성된 User ID
 */
export const createUser = async ( user ) => {
    const newUser = new User( user );
    await newUser.save();

    return newUser._id;
}

/**
 * 모든 유저 찾기
 * @returns 모든 User Schema
 */
export const getAllUser = async ( ) => {
    const result = await User.find();
    return result;
}