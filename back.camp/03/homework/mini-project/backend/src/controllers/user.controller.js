
import User from "../models/user.model.js";

// 유저 새로 만들기
export const createUser = async ( user ) => {
    const newUser = new User( user );
    await newUser.save();

    return newUser._id;
}

// 모든 유저 찾기
export const getAllUser = async ( ) => {
    const result = await User.find();
    return result;
}