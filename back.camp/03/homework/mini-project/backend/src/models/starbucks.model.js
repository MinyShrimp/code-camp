import mongoose from "mongoose";

export const StarbucksSchema = new mongoose.Schema({
    name: String,
    img: String,
});

const Starbucks = mongoose.model(
    "Starbucks", StarbucksSchema
);

export default Starbucks;