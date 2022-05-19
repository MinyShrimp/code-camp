import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
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

export default User;