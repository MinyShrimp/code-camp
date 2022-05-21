import mongoose from "mongoose";

/**
 * User Schema
 */
export const UserSchema = new mongoose.Schema({
    name:     String,
    email:    String,
    personal: String,
    prefer:   String,
    pwd:      String,
    phone:    String,
    createAt: Date,
    deleteAt: Date,
    og:       Object
});

/**
 * User Schema DB와 연결
 */
const User = mongoose.model(
    "User", UserSchema
);

export default User;