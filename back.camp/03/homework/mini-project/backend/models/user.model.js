import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:     String,
    email:    String,
    personal: String,
    prefer:   String,
    pwd:      String,
    phone:    String,
    og:       Object
});

const User = mongoose.model(
    "User", UserSchema
);

export const createUser = async ( user ) => {
    const newUser = new User( user );
    await newUser.save();

    return newUser._id;
}

export const getAllUser = async ( ) => {
    const result = await User.find();
    return result;
}