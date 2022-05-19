
import User from "../models/user.model.js";

export const createUser = async ( user ) => {
    const newUser = new User( user );
    await newUser.save();

    return newUser._id;
}

export const getAllUser = async ( ) => {
    const result = await User.find();
    return result;
}