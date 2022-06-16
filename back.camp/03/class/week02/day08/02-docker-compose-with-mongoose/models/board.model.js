import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
    writer: String,
    title: String,
    contents: String
});

export const Board = mongoose.model(
    "Board", BoardSchema
);